from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import (
    VacancyResponce, VacancyCreate, 
    ApplicationCreate, ApplicationResponceModel, 
    FundraiserResponse, FundraiserCreate
)
from backend.app.services import crud

router = APIRouter()

# --- EndPoints for vacancies ---
@router.get('/vacancies', response_model=List[VacancyResponce], tags=['Vacancies'])
async def read_vacancies(db: Session = Depends(get_db)):
    return await crud.get_all_vacancies(db)

@router.post('/vacancies', response_model=VacancyResponce, tags=['Vacancies'])
async def add_vacancy(vacancy: VacancyCreate, db: Session = Depends(get_db)):
    return await crud.create_vacancy(db=db, vacancy_data=vacancy)

# --- EndPoints for applying ---
@router.get('/applying', response_model=List[ApplicationResponceModel], tags=['Applications'])
async def read_applying(db: Session = Depends(get_db)):
    return await crud.get_applying(db)

@router.post('/applying', response_model=ApplicationResponceModel, tags=['Applications'])
async def add_applying(application: ApplicationCreate, db: Session = Depends(get_db)):
    return await crud.create_applying(db=db, application_data=application)

# --- EndPoints for fundraiser ---
@router.get('/fundraiser', response_model=List[FundraiserResponse], tags=['Fundraisers'])
async def read_vacancies(db: Session = Depends(get_db)):
    return await crud.get_fundraisers(db)

@router.post('/fundraiser', response_model=FundraiserResponse, tags=['Fundraisers'])
async def add_vacancy(fundraiser: VacancyCreate, db: Session = Depends(get_db)):
    return await crud.create_fundraiser(db=db, fundraiser_data=fundraiser)
