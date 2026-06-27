import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status, BackgroundTasks

from app.models.models import Vacancy, Application, Fundraiser, Question
from app.schemas.schemas import (
    VacancyCreate, VacancyUpdate,
    ApplicationCreate,
    FundraiserCreate, FundraiserUpdate,
    QuestionCreate, QuestionUpdate
)
from app.services.whatsapp_client import send_whatsapp_message

# --- Vacantions ---
async def get_all_vacancies(db: AsyncSession, include_inactive: bool = False):
    query = select(Vacancy)
    if not include_inactive: # В адмінці треба показувати і не активні вакансії
        query = query.where(Vacancy.is_active == True)
    data = await db.scalars(query)
    return data.all()

async def get_vacancy_by_id(db: AsyncSession, vacancy_id: int) -> Vacancy:
    vacancy = await db.get(Vacancy, vacancy_id)
    if not vacancy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Вакансію не знайдено')
    return vacancy

async def create_vacancy(db: AsyncSession, vacancy_data: VacancyCreate) -> Vacancy:
    db_vacancy = Vacancy(**vacancy_data.model_dump())
    db.add(db_vacancy)
    await db.commit()
    await db.refresh(db_vacancy)
    return db_vacancy

async def update_vacancy(db: AsyncSession, vacancy_id: int, vacancy_data: VacancyUpdate) -> Vacancy:
    vacancy = await get_vacancy_by_id(db=db, vacancy_id=vacancy_id)
    update_data = vacancy_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(vacancy, field, value)
    await db.commit()
    await db.refresh(vacancy)
    return vacancy

async def delete_vacancy(db: AsyncSession, vacancy_id: int) -> Vacancy:
    vacancy = await get_vacancy_by_id(db=db, vacancy_id=vacancy_id)
    await db.delete(vacancy)
    await db.commit()
    return vacancy

# --- Application ---
async def get_all_apllications(db: AsyncSession):
    data = await db.scalars(select(Application))
    return data.all()

async def get_application_by_id(db: AsyncSession, application_id: int) -> Application:
    res = await db.execute(
        select(Application)
        .options(selectinload(Application.vacancy))
        .where(Application.id == application_id)
    )
    application = res.scalar_one_or_none()
    if not application:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Заявку не знайдено')
    return application

async def _send_whatsapp_safe(message: str) -> None:
    try:
        await send_whatsapp_message(message)
    except Exception as e:
        import traceback # Не потрібно імпортувати і вантажити лишній раз якщо немає помилки 
        print(f'[WhatsApp] Error send message: {e}')
        print(traceback.format_exc())

async def create_application(
    db: AsyncSession,
    application_data: ApplicationCreate,
    background_tasks: BackgroundTasks | None = None
) -> Application:
    db_application = Application(**application_data.model_dump())
    db.add(db_application)
    await db.commit()
    await db.refresh(db_application)

    # Перевірка чи вказана вакансія 
    if db_application.vacancy_id is not None:
        try:
            vacancy = await get_vacancy_by_id(db=db, vacancy_id=db_application.vacancy_id)
            vacancy_title = vacancy.title
        except HTTPException:
            vacancy_title = 'Невідома вакансія (перевірте безпеку сайту)'
    else:
        vacancy_title = 'Не вказано'

    message = (
        f'Новий кандидат:\n'
        f'Ім\'я: {db_application.name}\n'
        f'Номер тел.: {db_application.phone}'
        f'\nE-mail: {db_application.email}\n'
        f'Бажаний час зв\'язку: {db_application.prefer_time}\n'
        f'Бажана вакансія: {vacancy_title}\n'
        f'Дата створення: {db_application.created_at}'
    )

    print(f'[Application] Queue WhatsApp send for application_id={db_application.id} vacancy_id={db_application.vacancy_id}')
    if background_tasks is not None:
        background_tasks.add_task(_send_whatsapp_safe, message)
    else:
        asyncio.create_task(_send_whatsapp_safe(message=message))

    return await get_application_by_id(db=db, application_id=db_application.id)

# --- Fundraisers ---
async def get_all_fundraisers(db: AsyncSession, include_inactive: bool = False):
    query = select(Fundraiser)
    if not include_inactive:
        query = query.where(Fundraiser.is_active == True)
    data = await db.scalars(query)
    return data.all()

async def get_fundraiser_by_id(db: AsyncSession, fundraiser_id: int) -> Fundraiser:
    fundraiser = await db.get(Fundraiser, fundraiser_id)
    if not fundraiser:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Збір не знайдено')
    return fundraiser

async def create_fundraiser(db: AsyncSession, fundraiser_data: FundraiserCreate) -> Fundraiser:
    db_fundraiser = Fundraiser(**fundraiser_data.model_dump())
    db.add(db_fundraiser)
    await db.commit()
    await db.refresh(db_fundraiser)
    return db_fundraiser

async def update_fundraiser(db: AsyncSession, fundraiser_id: int, fundraiser_data: FundraiserUpdate) -> Fundraiser:
    fundraiser = await get_fundraiser_by_id(db=db, fundraiser_id=fundraiser_id)
    update_data = fundraiser_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(fundraiser, field, value)
    await db.commit()
    await db.refresh(fundraiser)
    return fundraiser

async def delete_fundraiser(db: AsyncSession, fundraiser_id: int) -> Fundraiser:
    fundraiser = await get_fundraiser_by_id(db=db, fundraiser_id=fundraiser_id)
    await db.delete(fundraiser)
    await db.commit()
    return fundraiser

# --- FAQ ---
async def get_all_questions(db: AsyncSession, include_inactive: bool = False):
    query = select(Question)
    if not include_inactive:
        query = query.where(Question.is_active == True)
    query = query.order_by(Question.order.asc(), Question.id.asc())
    data = await db.scalars(query)
    return data.all()

async def get_question_by_id(db: AsyncSession, question_id: int) -> Question:
    question = await db.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Питання не знайдено')
    return question

async def create_question(db: AsyncSession, question_data: QuestionCreate) -> Question:
    db_question = Question(**question_data.model_dump())
    db.add(db_question)
    await db.commit()
    await db.refresh(db_question)
    return db_question

async def update_question(db: AsyncSession, question_id: int, question_data: QuestionUpdate) -> Question:
    question = await get_question_by_id(db=db, question_id=question_id)
    update_data = question_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(question, field, value)
    await db.commit()
    await db.refresh(question)
    return question

async def delete_question(db: AsyncSession, question_id: int) -> Question:
    question = await get_question_by_id(db=db, question_id=question_id)
    await db.delete(question)
    await db.commit()
    return question
