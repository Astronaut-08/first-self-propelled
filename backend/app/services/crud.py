from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.models import Vacancy, Application, Fundraisers
from app.schemas.schemas import VacancyCreate, ApplicationCreate, FundraiserCreate

# --- Vacantions ---
async def get_all_vacancies(db: AsyncSession):
    data = await db.scalars(select(Vacancy).where(Vacancy.is_active == True))
    return data.all()

async def create_vacancy(db: AsyncSession, vacancy_data: VacancyCreate):
    db_vacancy = await Vacancy(**vacancy_data.model_dump())
    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return db_vacancy

# --- Applying ---
async def create_applying(db: AsyncSession, application_data: ApplicationCreate):
    db_applying = await Application(**application_data.model_dump())
    db.add(db_applying)
    db.commit()
    db.refresh(db_applying)
    return db_applying

async def get_applying(db: AsyncSession):
    data = await db.scalars(select(Application))
    return data.all()

# --- Fundraisers ---
async def create_fundraiser(db: AsyncSession, fundraiser_data: FundraiserCreate):
    db_fundraiser = await Fundraisers(**fundraiser_data.model_dump())
    db.add(db_fundraiser)
    db.commit()
    db.refresh(db_fundraiser)
    return db_fundraiser

async def get_fundraisers(db: AsyncSession):
    data = await db.scalars(select(Fundraisers).where(Fundraisers.is_active == True))
    return data.all()
