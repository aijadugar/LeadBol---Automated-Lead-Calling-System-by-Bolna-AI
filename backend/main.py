from fastapi import FastAPI
import requests, time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOLNA_API_KEY = "sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
AGENT_ID = "ag_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
FROM_PHONE = "+919999999999"

CALL_RESULTS = {}

@app.get("/")
def home():
    return {"message": "Bolna Backend Running"}

@app.get("/api/results")
def get_results():
    return {"results": list(CALL_RESULTS.values())}

@app.post("/api/upload")
def upload(data: dict):

    leads = data["leads"]
    results = []

    for lead in leads:

        phone = str(lead["PHONE_NUMBER"])
        full_phone = "+91" + phone

        payload = {
            "agent_id": AGENT_ID,
            "recipient_phone_number": full_phone,
            "from_phone_number": FROM_PHONE
        }

        try:
            response = requests.post(
                "https://api.bolna.ai/call",
                json=payload,
                headers={
                    "Authorization": f"Bearer {BOLNA_API_KEY}",
                    "Content-Type": "application/json"
                }
            )

            response_data = response.json()
            call_id = response_data.get("execution_id")
            CALL_RESULTS[call_id] = {
                "phone_number": full_phone,
                "status": "initiated",
                "summary": ""
            }
            results.append({
                "phone_number": full_phone,
                "call_id": call_id
            })

        except Exception as e:
            results.append({
                "phone_number": full_phone,
                "error": str(e)
            })

    return {
        "calls": results
    }

@app.post("/api/webhook")
def bolna_webhook(data: dict):
    # print("wehbook received:", data)
    call_id = data.get("id")
    phone_number = data.get("user_number")
    status = data.get("status")
    summary = data.get("summary")
    CALL_RESULTS[call_id] = {
        "phone_number": phone_number,
        "status": status,
        "summary": summary
    }
    return {"success": True}
