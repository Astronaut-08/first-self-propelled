from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.models import Vacancy, Application, Fundraisers
from app.schemas.schemas import VacancyCreate, ApplicationCreate, FundraiserBase

# --- Vacantions ---
async def get_all_vacancies(db: AsyncSession):
    data = await db.scalars(select(Vacancy))
    return data.all()
