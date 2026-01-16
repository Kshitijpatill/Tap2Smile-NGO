from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter()

# Temporary hardcoded admin credentials
ADMIN_EMAIL = "admin@ngo.org"
ADMIN_PASSWORD = "admin123"

# JWT Config (later move to .env)
JWT_SECRET = "MY_SUPER_SECRET_KEY"
JWT_ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    if data.email != ADMIN_EMAIL or data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    payload = {
        "sub": data.email,
        "role": "admin",
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return {"token": token}
