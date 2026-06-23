from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.schemas import AdminLogin, Token, AdminResponse
from app.services.auth import login_admin, get_current_admin

router = APIRouter(tags=['Auth'])

# OAuth2 scheme для документації та автоматизації
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f'auth/login')


# ══════════════════════════════════════════════
# ENDPOINTS
# ══════════════════════════════════════════════

@router.post('/auth/login', response_model=Token, status_code=200)
async def login(credentials: AdminLogin, db: AsyncSession = Depends(get_db)):
    """Логін адміна та отримання JWT токена"""
    token = await login_admin(db, credentials)
    return token


@router.post('/auth/verify', response_model=AdminResponse, status_code=200)
async def verify(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    """Перевірка токена та отримання даних адміна"""
    admin = await get_current_admin(db, token)
    return admin


@router.get('/auth/me', response_model=AdminResponse, status_code=200)
async def get_me(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    """Отримати поточного адміна"""
    admin = await get_current_admin(db, token)
    return admin
