from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import programs, projects, events, forms

app = FastAPI(
    title="Tap To Smile API",
    description="Backend APIs for NGO website",
    version="1.0.0"
)

# CORS 
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
app.include_router(forms.router, prefix="/api/forms", tags=["Forms"])
