# Backend – AI Lead Calling System

This folder contains the backend service for the AI Lead Calling System.  
The backend manages lead data, call status, summaries, and integrations with AI voice agents.

It exposes REST APIs used by the frontend dashboard and handles communication with the AI calling system.

---

## Tech Stack

- Python
- FastAPI
- Uvicorn
- WebSockets
- AI Voice Agent (Bolna AI integration)

---

## Features

- Lead management APIs
- Store call logs and summaries
- Track call status
- Save AI generated transcripts
- Provide data to frontend dashboard
- Webhook endpoints for AI call events

---

## Installation

Create a virtual environment and install dependencies.

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
````

---

## Run the Backend Server

Start the API server using Uvicorn.

```bash
uvicorn app.main:app --reload
```

Server will run at:

```
http://localhost:8000
```

---

## AI Voice Integration

The backend receives webhook events from the AI voice agent.

Example workflow:

1. Lead uploaded
2. AI agent calls the lead
3. Call transcript generated
4. Summary stored in database
5. Dashboard updated
