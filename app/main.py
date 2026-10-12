from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.websocket_manager import connection_manager

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Smart Traffic Management System backend for monitoring roads, signals, incidents, and congestion analytics.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "environment": settings.ENVIRONMENT}


@app.websocket("/ws/traffic")
async def traffic_socket(websocket):
    await connection_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        await connection_manager.disconnect(websocket)


app.include_router(api_router, prefix="/api/v1")
