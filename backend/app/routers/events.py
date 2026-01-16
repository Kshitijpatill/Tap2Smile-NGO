from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_events():
    return [{"title": "Sample Event"}]
