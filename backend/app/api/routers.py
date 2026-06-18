from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import (
    VacancyResponce, VacancyCreate, 
    ApplicationCreate, ApplicationResponceModel, 
    FundraiserResponse, FundraiserCreate
)
from app.services import vacancy_service

router = APIRouter()

# --- EndPionts ---
@router.get('/vacancies', response_model=List[VacancyResponce], tags=['Vacancies'])
async def read_vacancies(db: Session = Depends(get_db)):
    return await vacancy_service.get_all_vacancies(db)
