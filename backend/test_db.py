import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

# Сюди вставте ваше посилання
DATABASE_URL = 'mysql+aiomysql://root:пароль@localhost:3306/firstsadn'

async def test_connection():
    print("Пробуємо підключитися до MySQL...")
    try:
        # Створюємо асинхронний двигун
        engine = create_async_engine(DATABASE_URL, echo=False)
        
        # Намагаємося виконати найпростіший запит
        async with engine.connect() as connection:
            result = await connection.execute(text("SELECT 1;"))
            value = result.scalar()
            
            if value == 1:
                print("🎉 УСПІХ! База даних MySQL успішно підключена!")
            else:
                print("🤔 Щось пішло не так: база повернула дивну відповідь.")
                
        # Закриваємо з'єднання
        await engine.dispose()
        
    except Exception as e:
        print("\n❌ ПОМИЛКА ПІДКЛЮЧЕННЯ!")
        print(f"Деталі помилки: {e}")

# Запуск асинхронного тесту
if __name__ == "__main__":
    asyncio.run(test_connection())