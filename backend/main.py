from app.core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ # Сюди свій продакшн домен коли деплоїм
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:5173'
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    expose_headers=['X-Total-Count'] #Кастомні заголовки для фронта 
)

app.include_router(router=router, prefix=settings.API_V1_STR)


@app.get("/")
def read_root():
    return {"status": "ok", "debug_mode": settings.DEBUG}