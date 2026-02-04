from fastapi import APIRouter, HTTPException, status, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import db
from app.core.security import verify_password, create_access_token, get_password_hash
from app.core.deps import get_current_user
from app.models.admin import AdminCreate, AdminResponse, AdminUpdate
from datetime import datetime
from email_validator import validate_email, EmailNotValidError
from bson import ObjectId
from typing import List


# login credentials for first superadmin
# email:admin@taptosmile.org
# pass: admin123


router = APIRouter()

@router.get("/", response_model=List[AdminResponse])
async def get_all_admins(current_user: dict = Depends(get_current_user)):
    """
    Get a list of all admin users. Only superadmins can see this.
    """
    if current_user.get("role") != "superadmin":
        raise HTTPException(
            status_code=403,
            detail="Not enough privileges."
        )
    
    admins_cursor = db.users.find()
    admins = await admins_cursor.to_list(length=100)
    
    results = []
    for admin in admins:
        admin["id"] = str(admin["_id"])
        results.append(admin)
        
    return results

@router.get("/me", response_model=AdminResponse)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    """
    Fetch the current logged-in admin's profile.
    Used by Frontend to display 'Welcome, [Name]'.
    """
    current_user["id"] = str(current_user["_id"])
    return current_user


@router.post("/login")
async def admin_login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.users.find_one({"email": form_data.username})

    if not user or not verify_password(form_data.password, user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user["email"], "role": user.get("role", "admin")}
    )
    # Set session-scoped httpOnly cookie (no max_age/expires => session cookie)
    # Note: in production consider setting `secure=True` and configuring SameSite as needed.
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax",
    )

    # Return token in body for backward compatibility
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
async def admin_logout(response: Response):
    """Clears the session cookie created during login."""
    response.delete_cookie(key="access_token")
    return {"success": True, "message": "Logged out"}


@router.post("/register", response_model=AdminResponse)
async def register_new_admin(
    new_admin: AdminCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new admin user. 
    - Checks if email is real (DNS check).
    - Only Superadmins can create other Superadmins.
    """

    try:
        valid = validate_email(new_admin.email, check_deliverability=True)
        new_admin.email = valid.email
    except EmailNotValidError as e:
        raise HTTPException(
            status_code=400, detail=f"Invalid email address: {str(e)}")

    if new_admin.role == "superadmin" and current_user.get("role") != "superadmin":
        raise HTTPException(
            status_code=403,
            detail="Only a Superadmin can create another Superadmin"
        )

    existing_user = await db.users.find_one({"email": new_admin.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    admin_dict = new_admin.model_dump()

    plain_password = admin_dict.pop("password")
    admin_dict["password_hash"] = get_password_hash(plain_password)

    admin_dict["created_at"] = datetime.utcnow()
    admin_dict["updated_at"] = datetime.utcnow()

    result = await db.users.insert_one(admin_dict)

    created_user = await db.users.find_one({"_id": result.inserted_id})
    created_user["id"] = str(created_user["_id"])

    return created_user

@router.put("/{admin_id}", response_model=AdminResponse)
async def update_admin(
    admin_id: str, 
    admin_data: AdminUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update an admin's details. Only 'superadmin' can do this.
    """
    if current_user.get("role") != "superadmin":
        raise HTTPException(
            status_code=403, 
            detail="Not enough privileges. Only superadmins can update users."
        )

    if not ObjectId.is_valid(admin_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    user = await db.users.find_one({"_id": ObjectId(admin_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_dict = admin_data.model_dump(exclude_unset=True) 
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    if "password" in update_dict:
        plain_password = update_dict.pop("password")
        update_dict["password_hash"] = get_password_hash(plain_password)

    update_dict["updated_at"] = datetime.utcnow()

    await db.users.update_one(
        {"_id": ObjectId(admin_id)},
        {"$set": update_dict}
    )

    updated_user = await db.users.find_one({"_id": ObjectId(admin_id)})
    updated_user["id"] = str(updated_user["_id"])
    
    return updated_user


@router.delete("/{admin_id}")
async def delete_admin(
    admin_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Delete an admin. Only 'superadmin' can do this.
    """
    if current_user.get("role") != "superadmin":
        raise HTTPException(
            status_code=403, 
            detail="Not enough privileges. Only superadmins can delete users."
        )

    if not ObjectId.is_valid(admin_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    if str(current_user["_id"]) == admin_id:
        raise HTTPException(status_code=400, detail="You cannot delete your own account")

    result = await db.users.delete_one({"_id": ObjectId(admin_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"success": True, "message": "Admin user deleted successfully"}