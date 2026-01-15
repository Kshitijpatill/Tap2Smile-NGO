from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_programs():
    return [{"title": "Sample Program"}]
