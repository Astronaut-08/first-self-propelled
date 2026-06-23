from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.models import Admin
from app.schemas.schemas import AdminLogin, Token, TokenData
from app.core.config import settings

# ══════════════════════════════════════════════
# PASSWORD HASHING SETUP (BCRYPT)
# ══════════════════════════════════════════════

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


# ══════════════════════════════════════════════
# PASSWORD FUNCTIONS
# ══════════════════════════════════════════════

def hash_password(password: str) -> str:
    """Хешує пароль за допомогою Bcrypt"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Перевіряє пароль проти хешу"""
    return pwd_context.verify(plain_password, hashed_password)


# ══════════════════════════════════════════════
# JWT TOKEN FUNCTIONS
# ══════════════════════════════════════════════

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Створює JWT токен"""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenData]:
    """Перевіряє та декодує JWT токен"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get('sub')
        if username is None:
            return None
        return TokenData(username=username)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Токен вийшов із ладу',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Невалідний токен',
            headers={'WWW-Authenticate': 'Bearer'},
        )


# ══════════════════════════════════════════════
# DATABASE OPERATIONS
# ══════════════════════════════════════════════

async def get_admin_by_username(db: AsyncSession, username: str) -> Optional[Admin]:
    """Знаходить адміна за ім\'ям"""
    query = select(Admin).where(Admin.username == username)
    result = await db.scalar(query)
    return result


async def authenticate_admin(db: AsyncSession, username: str, password: str) -> Optional[Admin]:
    """Автентифікує адміна за ім\'ям та паролем"""
    admin = await get_admin_by_username(db, username)
    if not admin or not verify_password(password, admin.hashed_password):
        return None
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Адмін акаунт вимкнений'
        )
    return admin


async def login_admin(db: AsyncSession, credentials: AdminLogin) -> Token:
    """Логінує адміна та повертає токен"""
    admin = await authenticate_admin(db, credentials.username, credentials.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Невірні дані',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    access_token = create_access_token(data={'sub': admin.username})
    
    return Token(
        access_token=access_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )


async def get_current_admin(db: AsyncSession, token: str) -> Admin:
    """Отримує поточного адміна з токена"""
    token_data = verify_token(token)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Невалідні дані',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    admin = await get_admin_by_username(db, username=token_data.username)
    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Адміна не знайдено',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Адмін акаунт вимкнений'
        )
    return admin
