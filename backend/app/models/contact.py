from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    message: str = Field(..., min_length=10)


class ContactResponse(ContactCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True