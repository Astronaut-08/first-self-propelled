from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings
import ssl

ssl_context = ssl.create_default_context()


engine = create_async_engine(
    str(settings.DATABASE_URL),
    echo=True,
    pool_pre_ping=True,
    connect_args={'ssl': ssl_context} # False при розробці /// ssl_context при деплої
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase): pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
