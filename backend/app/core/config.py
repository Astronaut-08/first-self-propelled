from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from urllib.parse import quote_plus

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = 'First Self Propelled'
    DEBUG: bool = False
    API_V1_STR: str = '/api/v1'

    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str = 'localhost'
    DB_PORT: int = 3306
    DB_NAME: str

    # META_API_VERSION: str = "v18.0"
    # META_ACCESS_TOKEN: str
    # META_VERIFY_TOKEN: str
    # META_PHONE_NUMBER_ID: str | None = None

    # Конфігурація самого класу Pydantic Settings
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

    @property
    def DATABASE_URL(self) -> str:
        encoder_password = quote_plus(self.DB_PASSWORD)
        return (
            f'mysql+aiomysql://{self.DB_USER}:{encoder_password}'
            f'@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'
        )

settings = Settings()
