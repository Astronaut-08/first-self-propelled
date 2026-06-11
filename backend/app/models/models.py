from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Text, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

class Vacancy(Base):
    __tablename__ = 'vacancies'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(254), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True)

    applications: Mapped[List['Application']] = relationship(
        back_populates='vacancy',
        cascade='all, delete-orphan'
    )

class Application(Base):
    __tablename__ = 'applications'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(254), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)

    vacancy_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey('vacancies.id', ondelete='SET NULL'),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(default=func.now())

    vacancy: Mapped[Optional['Vacancy']] = relationship(
        back_populates='applications'
    )

class Fundatiers(Base):
    __tablename__ = 'fundariers'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(254), nullable=False)
    target_amount: Mapped[int] = mapped_column(default=0)
    jar_url: Mapped[str] = mapped_column(String(254), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True)
