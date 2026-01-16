from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/api/programs")
def get_programs():
    return [
        {"name": "Program 1", "description": "this is program 1"},
        {"name": "Program 2", "description": "this is program 2"}
    ]


@app.get("/programs")
def programs_page(request: Request):
    programs = [
       {"name": "Program 1", "description": "this is program 1"},
        {"name": "Program 2", "description": "this is program 2"}
    ]
    return templates.TemplateResponse(
        "programs.html",
        {"request": request, "programs": programs}
    )
