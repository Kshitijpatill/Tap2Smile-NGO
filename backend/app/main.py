import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import test_mongodb_connection

from app.routers import (
    programs,
    projects,
    events,
    volunteers,
    contact,
    donations,
    impact,
    admin
)

app = FastAPI(
    title="Tap To Smile API",
    description="Backend APIs for NGO website",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.include_router(programs.router, prefix="/api/programs", tags=["Programs"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(impact.router, prefix="/api/impact", tags=["Impact"])
app.include_router(volunteers.router,
                   prefix="/api/volunteers", tags=["Volunteers"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(
    donations.router, prefix="/api/donations", tags=["Donations"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = {}
    for err in exc.errors():
        field = err["loc"][-1] if err["loc"] else "unknown"
        errors[field] = err["msg"]

    return JSONResponse(
        status_code=422,
        content={"success": False,
                 "message": "Validation failed", "errors": errors}
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"⚠️ INTERNAL ERROR: {repr(exc)}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Internal Server Error"}
    )


@app.on_event("startup")
async def startup_db_client():
    await test_mongodb_connection()


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "../../frontend/dist"))


if os.path.isdir(DIST_DIR):
    # A. Mount 'assets' folder (CSS, JS, Images)
    # This makes http://domain.com/assets/index.js work
    assets_path = os.path.join(DIST_DIR, "assets")
    if os.path.isdir(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    # B. Serve Root (Home Page)
    @app.get("/")
    async def serve_root():
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

    # C. Catch-All for React Router
    # Handles paths like /about, /donate, /favicon.ico, /vite.svg
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # 1. API Safety Check: If it starts with 'api', return 404 JSON, not HTML
        if full_path.startswith("api"):
            return JSONResponse(status_code=404, content={"message": "API endpoint not found"})

        # 2. Check if a specific file exists (e.g., favicon.ico, robot.txt)
        file_path = os.path.join(DIST_DIR, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)

        # 3. Default: Return index.html (SPA Routing)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

else:
    print("⚠️ WARNING: 'dist' folder NOT FOUND. Frontend will not be served.")
    print(f"   Expected location: {DIST_DIR}")
    print("   Please run 'npm run build' in the frontend folder.")
