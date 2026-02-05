from fastapi import APIRouter, HTTPException, Depends, status, Response, Body
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone
from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, EmailStr
from email_validator import validate_email, EmailNotValidError
import secrets

from app.core.database import db
from app.core.security import verify_password, create_access_token, get_password_hash
from app.core.config import settings
from app.core.deps import get_current_user
from app.core.mail import send_password_reset_email

router = APIRouter()


# login credentials for first superadmin
# email:admin@taptosmile.org
# pass: admin123
# remove this comment after before deployment

class AdminBase(BaseModel):
    email: EmailStr
    role: str = "admin"


class AdminCreate(AdminBase):
    password: str


class AdminUpdate(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    password: Optional[str] = None


class AdminResponse(AdminBase):
    id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PasswordResetRequest(BaseModel):
    email: EmailStr



@router.post("/login")
async def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.users.find_one({"email": form_data.username})

    if not user or not verify_password(form_data.password, user.get("hashed_password", user.get("password_hash"))):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user.get("role", "admin")},
        expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=AdminResponse)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    current_user["id"] = str(current_user["_id"])
    return current_user


@router.post("/forgot-password")
async def forgot_password(request: PasswordResetRequest):
    user = await db.users.find_one({"email": request.email})

    if not user:
        return {"message": "If this email is registered, a new password has been sent."}

    temp_password = secrets.token_urlsafe(8)
    hashed_pw = get_password_hash(temp_password)

    await db.users.update_one(
        {"email": request.email},
        {"$set": {"hashed_password": hashed_pw}}
    )

    try:
        await send_password_reset_email(request.email, temp_password)
    except Exception as e:
        print(f"Failed to send email: {e}")
        
    return {"message": "If this email is registered, a new password has been sent."}


@router.get("/", dependencies=[Depends(get_current_user)], response_model=List[AdminResponse])
async def get_admins():
    cursor = db.users.find()
    admins = await cursor.to_list(length=100)
    for a in admins:
        a["id"] = str(a["_id"])
    return admins


@router.post("/", dependencies=[Depends(get_current_user)], response_model=AdminResponse)
async def create_admin(new_admin: AdminCreate):
    try:
        validate_email(new_admin.email, check_deliverability=True)
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail=f"Invalid email: {str(e)}")

    existing_user = await db.users.find_one({"email": new_admin.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    admin_dict = new_admin.model_dump()
    plain_password = admin_dict.pop("password")
    admin_dict["hashed_password"] = get_password_hash(plain_password)
    admin_dict["created_at"] = datetime.now(timezone.utc)

    result = await db.users.insert_one(admin_dict)

    created_user = await db.users.find_one({"_id": result.inserted_id})
    created_user["id"] = str(created_user["_id"])

    return created_user


@router.delete("/{admin_id}", dependencies=[Depends(get_current_user)])
async def delete_admin(admin_id: str, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(admin_id):
        raise HTTPException(status_code=400, detail="Invalid ID")

    if str(current_user["_id"]) == admin_id:
        raise HTTPException(
            status_code=400, detail="You cannot delete your own account.")

    result = await db.users.delete_one({"_id": ObjectId(admin_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")

    return {"message": "Admin deleted successfully"}
