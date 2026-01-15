from fastapi import APIRouter

router = APIRouter()

@router.post("/volunteer")
def volunteer_form(data: dict):
    return {"message": "Volunteer form received"}
