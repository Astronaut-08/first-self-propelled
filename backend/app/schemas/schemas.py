from typing import Optional
from pydantic import BaseModel, Field, ConfigDict, HttpUrl, field_validator
from datetime import datetime
import re

# Налаштування валідації вакансій
class VacancyBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=254, description='Назва вакансії')
    description: str = Field(None, description='Опис вакансії')
    is_active: bool = Field(True, description='Чи актуальна вакансія в даний момент')

class VacancyCreate(VacancyBase):
    pass

class VacancyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=254)
    description: Optional[str] = None
    is_active: Optional[bool] = None

class VacancyResponce(VacancyBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# Налаштування валідації форми користувача
class ApplicationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=254, description='Ім\'я користувача')
    phone: str = Field(..., max_length=20, description='Номер телефону користувача')
    vacancy_id: Optional[int] = Field(None, description='Вакансія на яку подається користувач')

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, value: str) -> str:
        cleaned = re.sub(r'[\s\-()]', '', value)

        phone_regex = re.compile(r'^\+?[0-9]{9,15}$')
        if not phone_regex.match(cleaned):
            raise ValueError('Некоректний формат номера телефону')
        
        return cleaned
    
class ApplicationResponce(BaseModel):
    id: int
    name: str
    phone: str
    vacancy_id: Optional[int]
    created_at: datetime

    vacancy: Optional[VacancyResponce] = None
    model_config = ConfigDict(from_attributes=True)

# Налаштування валідацій зборів
class FundraiserBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=254, description='Назва збору')
    target_amount: int = Field(..., ge=0, description='Цільова сума збору')
    description: Optional[str] = Field(None, description='Опис збору')
    is_active: bool = Field(True, description='Актуальність збору')

class FundraiserCreate(FundraiserBase):
    jar_url: HttpUrl = Field(..., description='Посилання на збір')

    @field_validator('jar_url', mode='after')
    @classmethod
    def serializa_url(cls, value: HttpUrl) -> str:
        return str(value)
    
class FundraiserUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=254)
    target_amount: Optional[int] = Field(None, ge=0)
    jar_url: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None
    
class FundraiserResponse(FundraiserBase):
    id: int
    jar_url: str

    model_config = ConfigDict(from_attributes=True)

# FAQ Опрацювання
class QuestionBase(BaseModel):
    question: str = Field(..., min_length=5, max_length=254)
    answer: str = Field(..., min_length=5)
    is_active: bool = Field(True)
    order: int = Field(0, ge=0)

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    question: Optional[str] = Field(None, min_length=5, max_length=254)
    answer: Optional[str] = Field(None, min_length=5)
    is_active: Optional[bool] = None
    order: Optional[int] = Field(None, ge=0)

class QuestionResponce(QuestionBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
