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

BOLNA_API_KEY = "your_bolna_api_key"
AGENT_ID = "your_agent_id"
FROM_PHONE = "your_from_phone_number"

@app.get("/")
def home():
    return {"message": "Bolna Backend Running"}

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

        except Exception as e:
            response_data = {"error": str(e)}

        results.append({
            "phone_number": full_phone,
            "api_status_code": response.status_code,
            "response": response_data
        })

        time.sleep(2)

    return {
        "total_numbers": len(leads),
        "results": results
    }
