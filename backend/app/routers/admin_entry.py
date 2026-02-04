from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse
from app.core.deps import get_current_user
from pathlib import Path

router = APIRouter()

@router.get("/admin-entry", response_class=HTMLResponse)
async def admin_entry(user=Depends(get_current_user)):
    """
    🔐 HARD GATE:
    - If cookie invalid → 401
    - If valid → serve admin SPA fresh
    """
    html_path = Path("app/static/admin.html")
    return html_path.read_text(encoding="utf-8")
