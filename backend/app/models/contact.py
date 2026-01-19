from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=100) 
    message: str = Field(..., min_length=10)

class ContactResponse(ContactCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True