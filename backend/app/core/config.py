from pathlib import Path
from pydantic import EmailStr, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = 'First Self Propelled'
    DEBUG: bool = False
    API_V1_STR: str = '/api/v1'

    DATABASE_URL = PostgresDsn

    META_API_VERSION: str = "v18.0"
    META_ACCESS_TOKEN: str
    META_VERIFY_TOKEN: str
    META_PHONE_NUMBER_ID: str | None = None

    # Конфігурація самого класу Pydantic Settings
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / "migrations/.env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


settings = Settings()
