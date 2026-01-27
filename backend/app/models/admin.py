from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime


class AdminBase(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    is_active: bool = True
    role: str = "admin"


class AdminCreate(AdminBase):
    password: str = Field(..., min_length=8)

    @validator("role")
    def validate_role(cls, v):
        if v not in ["admin", "superadmin"]:
            raise ValueError('Role must be "admin" or "superadmin"')
        return v


class AdminUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None

    @validator("role")
    def validate_role(cls, v):
        if v and v not in ["admin", "superadmin"]:
            raise ValueError('Role must be "admin" or "superadmin"')
        return v


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


# Internal DB model
class AdminInDB(AdminBase):
    password_hash: str
    created_at: datetime
    updated_at: datetime


# Response model (what frontend sees)
class AdminResponse(AdminBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
