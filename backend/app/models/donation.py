from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date


class DonationCreate(BaseModel):
    donor_name: Optional[str] = None
    donor_email: Optional[EmailStr] = None
    donor_phone: Optional[str] = None
    amount: float = Field(..., gt=0)
    message: Optional[str] = None


class DonationResponse(DonationCreate):
    id: str
    payment_id: Optional[str] = None
    order_id: Optional[str] = None
    payment_status: str = "pending"
    created_at: datetime

    class Config:
        from_attributes = True
