from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, programs, projects, events, forms

app = FastAPI(
    title="Tap To Smile API",
    description="Backend APIs for NGO website",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Later replace "*" with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Health Check
@app.get("/")
def health_check():
    return {"status": "Tap To Smile Backend Running"}

# --- API Routers ---

# Authentication
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

# Core Content
app.include_router(programs.router, prefix="/api/programs", tags=["Programs"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])

# Public Forms
app.include_router(forms.router, prefix="/api/forms", tags=["Forms"])
