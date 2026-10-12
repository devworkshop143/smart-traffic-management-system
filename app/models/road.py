from __future__ import annotations

from datetime import datetime

from sqlalchemy import String, Integer, Float, DateTime, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


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
