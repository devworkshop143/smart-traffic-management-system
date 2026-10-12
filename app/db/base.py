from __future__ import annotations

from datetime import datetime

from sqlalchemy import Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="viewer", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    notifications: Mapped[list["Notification"]] = relationship(back_populates="user")


class Road(Base):
    __tablename__ = "roads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    start_point: Mapped[str] = mapped_column(String(255), nullable=False)
    end_point: Mapped[str] = mapped_column(String(255), nullable=False)
    length_km: Mapped[float] = mapped_column(Float, default=0.0)
    lanes: Mapped[int] = mapped_column(Integer, default=2)
    speed_limit_kph: Mapped[int] = mapped_column(Integer, default=50)
    status: Mapped[str] = mapped_column(String(50), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class Intersection(Base):
    __tablename__ = "intersections"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    road_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    latitude: Mapped[float] = mapped_column(Float, default=0.0)
    longitude: Mapped[float] = mapped_column(Float, default=0.0)
    signal_type: Mapped[str] = mapped_column(String(50), default="adaptive")
    control_mode: Mapped[str] = mapped_column(String(50), default="automatic")
    status: Mapped[str] = mapped_column(String(50), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class TrafficSignal(Base):
    __tablename__ = "traffic_signals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    intersection_id: Mapped[int] = mapped_column(Integer, ForeignKey("intersections.id"), nullable=False)
    phase: Mapped[str] = mapped_column(String(50), default="north_south")
    cycle_length: Mapped[int] = mapped_column(Integer, default=90)
    north_south_green: Mapped[int] = mapped_column(Integer, default=40)
    east_west_green: Mapped[int] = mapped_column(Integer, default=30)
    yellow_time: Mapped[int] = mapped_column(Integer, default=5)
    status: Mapped[str] = mapped_column(String(50), default="active")
    current_phase: Mapped[str] = mapped_column(String(50), default="north_south")
    adaptive_mode: Mapped[bool] = mapped_column(Boolean, default=True)
    average_waiting_time: Mapped[float] = mapped_column(Float, default=0.0)
    vehicle_count: Mapped[int] = mapped_column(Integer, default=0)
    congestion_level: Mapped[str] = mapped_column(String(50), default="low")
    last_updated: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class Sensor(Base):
    __tablename__ = "sensors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    sensor_type: Mapped[str] = mapped_column(String(50), default="loop")
    road_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    intersection_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    latitude: Mapped[float] = mapped_column(Float, default=0.0)
    longitude: Mapped[float] = mapped_column(Float, default=0.0)
    status: Mapped[str] = mapped_column(String(50), default="online")
    last_reading: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class TrafficReading(Base):
    __tablename__ = "traffic_readings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sensor_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("sensors.id"), nullable=True)
    road_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    intersection_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    vehicle_count: Mapped[int] = mapped_column(Integer, default=0)
    average_speed: Mapped[float] = mapped_column(Float, default=0.0)
    occupancy: Mapped[float] = mapped_column(Float, default=0.0)
    density: Mapped[float] = mapped_column(Float, default=0.0)
    queue_length: Mapped[int] = mapped_column(Integer, default=0)
    waiting_time: Mapped[float] = mapped_column(Float, default=0.0)
    congestion_level: Mapped[str] = mapped_column(String(50), default="low")
    incident_flag: Mapped[bool] = mapped_column(Boolean, default=False)
    emergency_vehicle_count: Mapped[int] = mapped_column(Integer, default=0)


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(String(100), default="roadwork")
    severity: Mapped[str] = mapped_column(String(50), default="medium")
    description: Mapped[str] = mapped_column(String(1000), default="")
    status: Mapped[str] = mapped_column(String(50), default="open")
    road_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    intersection_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sensor_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    latitude: Mapped[float] = mapped_column(Float, default=0.0)
    longitude: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class TrafficViolation(Base):
    __tablename__ = "traffic_violations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    vehicle_plate: Mapped[str] = mapped_column(String(50), nullable=False)
    violation_type: Mapped[str] = mapped_column(String(100), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), default="")
    status: Mapped[str] = mapped_column(String(50), default="pending")
    fine_amount: Mapped[float] = mapped_column(Float, default=0.0)
    reviewed_by: Mapped[int | None] = mapped_column(Integer, nullable=True)
    review_notes: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class EmergencyVehicleRequest(Base):
    __tablename__ = "emergency_vehicle_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    vehicle_plate: Mapped[str] = mapped_column(String(50), nullable=False)
    emergency_type: Mapped[str] = mapped_column(String(100), default="ambulance")
    route: Mapped[str] = mapped_column(String(255), nullable=False)
    priority_level: Mapped[str] = mapped_column(String(50), default="high")
    status: Mapped[str] = mapped_column(String(50), default="pending")
    intersection_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    road_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    request_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    estimated_arrival: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(String(1000), nullable=False)
    notification_type: Mapped[str] = mapped_column(String(50), default="info")
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    user: Mapped[User] = relationship(back_populates="notifications")


class TrafficSignalOptimizationLog(Base):
    __tablename__ = "traffic_signal_optimization_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    signal_id: Mapped[int] = mapped_column(Integer, ForeignKey("traffic_signals.id"), nullable=False)
    optimization_reason: Mapped[str] = mapped_column(String(255), default="adaptive")
    recommended_cycle_length: Mapped[int] = mapped_column(Integer, default=90)
    vehicle_count: Mapped[int] = mapped_column(Integer, default=0)
    congestion_level: Mapped[str] = mapped_column(String(50), default="low")
    old_phase: Mapped[str] = mapped_column(String(50), default="north_south")
    new_phase: Mapped[str] = mapped_column(String(50), default="east_west")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
