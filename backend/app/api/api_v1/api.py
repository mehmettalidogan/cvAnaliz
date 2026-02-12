from fastapi import APIRouter
from app.api.api_v1.endpoints import cv_upload

api_router = APIRouter()
api_router.include_router(cv_upload.router, prefix="/cv", tags=["cv"])
