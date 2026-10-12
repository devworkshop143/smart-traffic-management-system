from fastapi import APIRouter

from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.roads import router as roads_router
from app.api.v1.endpoints.intersections import router as intersections_router
from app.api.v1.endpoints.signals import router as signals_router
from app.api.v1.endpoints.sensors import router as sensors_router
from app.api.v1.endpoints.incidents import router as incidents_router
from app.api.v1.endpoints.traffic import router as traffic_router
from app.api.v1.endpoints.violations import router as violations_router
from app.api.v1.endpoints.emergency import router as emergency_router
from app.api.v1.endpoints.notifications import router as notifications_router
from app.api.v1.endpoints.routes import router as routes_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(roads_router, prefix="/roads", tags=["Roads"])
api_router.include_router(intersections_router, prefix="/intersections", tags=["Intersections"])
api_router.include_router(signals_router, prefix="/signals", tags=["Traffic Signals"])
api_router.include_router(sensors_router, prefix="/sensors", tags=["Sensors"])
api_router.include_router(incidents_router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(traffic_router, prefix="/traffic", tags=["Traffic Monitoring"])
api_router.include_router(violations_router, prefix="/violations", tags=["Traffic Violations"])
api_router.include_router(emergency_router, prefix="/emergency", tags=["Emergency Vehicle Priority"])
api_router.include_router(notifications_router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(routes_router, prefix="/routes", tags=["Route Planning"])
