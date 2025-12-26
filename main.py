# main.py
"""
Main FastAPI application.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from config import settings
from database import engine
from routes import restaurant_routes, user_routes, order_routes

app = FastAPI(
    title="Food Delivery API",
    description="API for food delivery application",
    version="1.0.0",
    contact={
        "name": "API Support",
        "email": "support@example.com",
    },
)

# CORS configuration
origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
@app.on_event("startup")
async def startup_event():
    await engine.connect()

# Error handling
@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    error_messages = []
    for error in exc.errors():
        error_messages.append(f"{error['loc']}: {error['msg']}")
    return JSONResponse(
        status_code=400,
        content={"error": "Validation error", "messages": error_messages},
    )

@app.exception_handler(ValidationError)
async def validation_error_handler(request: Request, exc: ValidationError):
    error_messages = []
    for error in exc.errors():
        error_messages.append(f"{error['loc']}: {error['msg']}")
    return JSONResponse(
        status_code=400,
        content={"error": "Validation error", "messages": error_messages},
    )

# API routes
app.include_router(restaurant_routes)
app.include_router(user_routes)
app.include_router(order_routes)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)