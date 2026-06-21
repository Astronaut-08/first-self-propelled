from typing import List
from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse

from app.database import get_db
from app.schemas.schemas import (
    VacancyResponce, VacancyCreate, VacancyUpdate,
    ApplicationCreate, ApplicationResponce,
    FundraiserResponse, FundraiserCreate, FundraiserUpdate,
    QuestionResponce, QuestionCreate, QuestionUpdate
)
from app.services import crud

router = APIRouter()

# ══════════════════════════════════════════════
# VACANCIES
# Публічний сайт: тільки активні (include_inactive=False)
# Адмін: include_inactive=True
# ══════════════════════════════════════════════

@router.get('/vacancies', response_model=List[VacancyResponce], tags=['Vacancies'])
async def read_vacancies(
    include_inactive: bool = Query(False, description='Показувати неактивні (для адмінки)'),
    db=Depends(get_db)
):
    items = await crud.get_all_vacancies(db=db, include_inactive=include_inactive)
    response = JSONResponse(content=[
        {'id': v.id, 'title': v.title, 'description': v.description, 'is_active': v.is_active}
        for v in items
    ])
    response.headers['X-Total-Count'] = str(len(items))
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    return response

@router.get('/vacancies/{vacancy_id}', response_model=VacancyResponce, tags=['Vacancies'])
async def read_vacancy(vacancy_id: int, db=Depends(get_db)):
    return await crud.get_vacancy_by_id(db=db, vacancy_id=vacancy_id)

@router.post('/vacancies', response_model=VacancyResponce, status_code=201, tags=['Vacancies'])
async def add_vacancy(vacancy: VacancyCreate, db=Depends(get_db)):
    return await crud.create_vacancy(db=db, vacancy_data=vacancy)

@router.put('/vacancies/{vacancy_id}', response_model=VacancyResponce, tags=['Vacancies'])
async def edit_vacancy(vacancy_id: int, vacancy: VacancyUpdate, db=Depends(get_db)):
    return await crud.update_vacancy(db=db, vacancy_id=vacancy_id, vacancy_data=vacancy)

@router.delete('/vacancies/{vacancy_id}', response_model=VacancyResponce, tags=['Vacancies'])
async def remove_vacancy(vacancy_id: int, db=Depends(get_db)):
    return await crud.delete_vacancy(db=db, vacancy_id=vacancy_id)

# ══════════════════════════════════════════════
# APPLICATIONS
# Тільки читання — дані йтимуть у WhatsApp
# ══════════════════════════════════════════════

@router.get('/applications', response_model=List[ApplicationResponce], tags=['Applications'])
async def read_applications(db=Depends(get_db)):
    items = await crud.get_all_apllications(db=db)
    response = JSONResponse(content=[
        {
            'id': a.id, 'name': a.name, 'phone': a.phone,
            'vacancy_id': a.vacancy_id,
            'created_at': a.created_at.isoformat() if a.created_at else None
        } for a in items
    ])
    response.headers['X-Total-Count'] = str(len(items))
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    return response

@router.get('/applications/{application_id}', response_model=ApplicationResponce, tags=['Applications'])
async def read_application(application_id: int, db=Depends(get_db)):
    return await crud.get_application_by_id(application_id=application_id, db=db)

@router.post('/applications', response_model=ApplicationResponce, status_code=201, tags=['Applications'])
async def add_application(application: ApplicationCreate, db=Depends(get_db)):
    return await crud.create_application(db=db, application_data=application)

# ══════════════════════════════════════════════
# FUNDRAISERS
# ══════════════════════════════════════════════

@router.get('/fundraiser', response_model=List[FundraiserResponse], tags=['Fundraisers'])
async def read_fundraisers(db=Depends(get_db), include_inactive=Query(False)):
    items = await crud.get_all_fundraisers(db=db, include_inactive=include_inactive)
    response = JSONResponse(content=[
        {
            'id': f.id, 'title': f.title, 'target_amount': f.target_amount,
            'jar_url': f.jar_url, 'description': f.description, 'is_active': f.is_active
        } for f in items
    ])
    response.headers['X-Total-Count'] = str(len(items))
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    return response

@router.get('/fundraiser/{fundraiser_id}', response_model=FundraiserResponse, tags=['Fundraisers'])
async def read_fundraiser(fundraiser_id: int, db=Depends(get_db)):
    return await crud.get_fundraiser_by_id(db=db, fundraiser_id=fundraiser_id)

@router.post('/fundraiser', response_model=FundraiserResponse, status_code=201,  tags=['Fundraisers'])
async def add_fundraiser(fundraiser: FundraiserCreate, db=Depends(get_db)):
    return await crud.create_fundraiser(db=db, fundraiser_data=fundraiser)

@router.put('/fundraiser/{fundraiser_id}', response_model=FundraiserResponse, tags=['Fundraisers'])
async def edit_fundraiser(fundraiser_id: int, fundraiser: FundraiserUpdate, db=Depends(get_db)):
    return await crud.update_fundraiser(db=db, fundraiser_id=fundraiser_id, fundraiser_data=fundraiser)

@router.delete('/fundraiser/{fundraiser_id}', response_model=FundraiserResponse, tags=['Fundraisers'])
async def remove_fundraiser(fundraiser_id: int, db=Depends(get_db)):
    return await crud.delete_fundraiser(db=db, fundraiser_id=fundraiser_id)

# ══════════════════════════════════════════════
# QUESTIONS (FAQ)
# ══════════════════════════════════════════════
@router.get('/questions', response_model=List[QuestionResponce], tags=['Questions'])
async def read_questions(include_inactive: bool = Query(False), db=Depends(get_db)):
    items = await crud.get_all_questions(db=db, include_inactive=include_inactive)
    response = JSONResponse(content=[
        {
            'id': q.id, 'question': q.question, 'answer': q.answer,
            'is_active': q.is_active, 'order': q.order
        } for q in items
    ])
    response.headers['X-Total-Count'] = str(len(items))
    response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    return response

@router.get('/questions/{question_id}', response_model=QuestionResponce, tags=['Questions'])
async def read_question(question_id: int, db=Depends(get_db)):
    return await crud.get_question_by_id(db=db, question_id=question_id)

@router.post('/questions', response_model=QuestionResponce, status_code=201, tags=['Questions'])
async def add_question(question: QuestionCreate, db=Depends(get_db)):
    return await crud.create_question(db=db, question_data=question)

@router.put('/questions/{question_id}', response_model=QuestionResponce, tags=['Questions'])
async def edit_question(question_id: int, question: QuestionUpdate, db=Depends(get_db)):
    return await crud.update_question(db=db, question_id=question_id, question_data=question)

@router.delete('/questions/{question_id}', response_model=QuestionResponce, tags=['Questions'])
async def remove_question(question_id: int, db=Depends(get_db)):
    return await crud.delete_question(db=db, question_id=question_id)
