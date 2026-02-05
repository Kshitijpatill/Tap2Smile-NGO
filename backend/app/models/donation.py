from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class DonationCreate(BaseModel):
    donor_name: str = Field(..., min_length=2)
    donor_email: EmailStr
    donor_phone: str = Field(..., min_length=10, max_length=15)
    amount: float = Field(..., gt=0)
    message: Optional[str] = None

class DonationResponse(DonationCreate):
    id: str
    status: str 
    created_at: datetime

    class Config:
        from_attributes = True