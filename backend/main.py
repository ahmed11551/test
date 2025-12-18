from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import uuid
import os

app = FastAPI(title="Chat API", version="1.0.0")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if "*" not in allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: str
    text: str
    timestamp: str
    sender: str

class MessageCreate(BaseModel):
    text: str = Field(..., min_length=1, max_length=4096)
    sender: str = Field(default="user", max_length=50)

messages_storage: List[Message] = []

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Chat API is running"}

@app.get("/messages", response_model=List[Message])
def get_messages():
    return messages_storage

@app.post("/messages", response_model=Message)
def create_message(message_create: MessageCreate):
    message = Message(
        id=str(uuid.uuid4()),
        text=message_create.text.strip(),
        timestamp=datetime.now().isoformat(),
        sender=message_create.sender
    )
    
    messages_storage.append(message)
    return message

@app.delete("/messages")
def clear_messages():
    messages_storage.clear()
    return {"status": "ok", "message": "All messages cleared"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Chat API"}

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "error": "Not Found",
        "message": f"The requested endpoint {request.url.path} was not found",
        "available_endpoints": [
            "GET /",
            "GET /health",
            "GET /messages",
            "POST /messages",
            "DELETE /messages",
            "GET /docs"
        ]
    }

