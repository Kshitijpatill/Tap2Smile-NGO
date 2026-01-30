from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date


class ImpactBase(BaseModel):
    title: str = Field(..., min_length=3)
    value: Optional[str] = None
    icon: Optional[str] = None


class ImpactResponse(ImpactBase):
    id: str
    updated_at: datetime

    class Config:
        from_attributes = True
