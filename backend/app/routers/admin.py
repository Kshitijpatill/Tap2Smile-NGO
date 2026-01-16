from fastapi import APIRouter, HTTPException, status
from app.models.admin import AdminLogin
from app.core.database import db
from app.core.security import verify_password, create_access_token

router = APIRouter()

@router.post("/login")
async def admin_login(credentials: AdminLogin):
    # 1. Fetch the admin user from MongoDB by email
    admin = await db.admins.find_one({"email": credentials.email})
    
    # 2. Check if admin exists and password matches the hash
    if not admin or not verify_password(credentials.password, admin['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Create the JWT Token
    access_token = create_access_token(
        data={"sub": admin["email"], "role": admin.get("role", "admin")}
    )
    
    return {"success": True, "token": access_token, "token_type": "bearer"}