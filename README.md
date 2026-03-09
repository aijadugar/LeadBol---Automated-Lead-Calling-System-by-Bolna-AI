# LeadBol – Automated Lead Calling System using Bolna AI

An AI-powered automated lead calling system that uses voice AI agents to call leads, qualify them, and store insights in a dashboard.

This project demonstrates how businesses can automate outbound lead qualification using AI voice agents instead of manual calling.

The system integrates a Voice AI agent with a full-stack application to track calls, summaries, and lead status.

---

## The Problem

Sales teams often spend hours calling leads manually.  
Many leads are not qualified, resulting in wasted time.

Businesses need a system that can:

- Call leads automatically
- Ask qualification questions
- Generate summaries
- Track call outcomes
- Provide a dashboard for monitoring results
- Allow to download these results

---

## Solution

LeadBol uses an AI voice agent to automatically call leads and qualify them through natural conversation.

The AI agent interacts with leads, collects information, and sends call results to the backend where they are stored and displayed in a dashboard.

---

## Tech Stack

### Frontend
- React
- Typescript (for type safety)

### Backend
- FastAPI
- Python

### AI & Voice Infrastructure
- Bolna AI
- Telephony provider (Twilio)
- LLM (OpenAI)

---

## Features

- Automated AI lead calling
- AI conversation handling
- Call status tracking
- Call summary generation
- Recording storage on Bolna
- Dashboard for monitoring calls
- REST APIs for lead management

---

## Project Structure

```

LeadBol
│
├── frontend
│   └── React dashboard
│
├── backend
│   └── FastAPI backend
│
├── README.md

````

---

## System Architecture

```mermaid
flowchart LR

A[Lead Data] --> B[Backend API]
B --> C[AI Voice Agent]

C --> D[Telephony Provider]
D --> E[Customer Phone]

E --> D
D --> C

C --> F[Conversation AI]
F --> G[Frontend Dashboard]

````

---

## Call Workflow

1. Leads are stored in the database
2. Backend sends lead data to the AI agent
3. AI agent initiates a call
4. Customer answers the phone
5. AI agent asks qualification questions
6. Responses are processed using an LLM
7. Call summary is generated
8. Dashboard displays call results
9. User can download the results

---

### Run Backend

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Server runs on:

```
http://localhost:8000
```

---

### Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```
