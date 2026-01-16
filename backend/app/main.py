from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import test_mongodb_connection
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.routers import (
    programs,
    contact,
    # projects,
    # events,
    # volunteers,
    # donations,
    # impact,
    # admin
)

app = FastAPI(
    title="Tap To Smile API",
    description="Backend APIs for NGO website",
    version="1.0.0"
)


@app.get("/")
def root():
    return {"message": "Welcome to Tap To Smile API"}


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Public Routes
app.include_router(programs.router, prefix="/api/programs", tags=["Programs"])
# app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
# app.include_router(events.router, prefix="/api/events", tags=["Events"])
# app.include_router(impact.router, prefix="/api/impact", tags=["Impact"])

# Form and Submission Routes
# app.include_router(volunteers.router, prefix="/api/forms", tags=["Forms"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
# app.include_router(
#     donations.router, prefix="/api/donations", tags=["Donations"])

# Admin and Authentication Routes
# app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = {}
    for err in exc.errors():
        field = err["loc"][-1]
        errors[field] = err["msg"]

    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": "Validation failed",
            "errors": errors
        }
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Something went wrong. Please try again later."
        }
    )


# mongoDB connection check
@app.on_event("startup")
async def startup_db_client():
    connection_success = await test_mongodb_connection()
    if not connection_success:
        print("CRITICAL: Could not connect to MongoDB Atlas.")
    else:
        print("Connected to MongoDB Atlas successfully.")
