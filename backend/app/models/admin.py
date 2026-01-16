from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# Shared fields
class AdminBase(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    is_active: bool = True


# When creating admin
class AdminCreate(AdminBase):
    password: str = Field(..., min_length=8)


# Login request
class AdminLogin(BaseModel):
    email: EmailStr
    password: str


# Internal DB model (NOT exposed)
class AdminInDB(AdminBase):
    password_hash: str
    role: str = "admin"
    created_at: datetime
    updated_at: datetime


# Response model (what frontend sees)
class AdminResponse(AdminBase):
    id: str
    created_at: datetime
    class Config:
        from_attributes = True  
