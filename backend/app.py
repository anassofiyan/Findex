from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Findex backend is running"}

@app.get("/search")
def search(q: str):
    response = requests.get(
        "http://localhost:8080/search",
        params={
            "q": q,
            "format": "json"
        }
    )

    return response.json()
