from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date


class EventBase(BaseModel):
    title: str = Field(..., min_length=3)
    description: str
    event_date: date
    location: Optional[str] = None
    is_upcoming: bool = True


class EventResponse(EventBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
