import httpx
import asyncio
from app.core.config import settings


async def send_whatsapp_message(text: str, to: str = settings.WA_GROUP_ID):
    url = settings.SEND_MSG_URL
    headers_post = {
        'apikey': settings.SECRET_KEY,
        'Content-type': 'application/json'
    }
    payload = {
        'number': to,
        'text': text,
        'delay': 1200,
        'presence': 'composing'
    }

    print(f'[WhatsApp] Sending message to={to} url={url} text_len={len(text)}')
    print(f'[WhatsApp] Payload={payload}')

    is_wakeup_call = (text == '')
    wakeup_url = 'https://wa-evolution-api.onrender.com'

    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        tries = 10
        delay = 15

        for attempt in range(1, tries + 1):
            try:
                if is_wakeup_call:
                    print(f'[WhatsApp] Пробуємо розбудити бота')
                    headers_get = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                    response = await client.get(wakeup_url, headers=headers_get)
                else:
                    print(f'[WhatsApp] Спроба={attempt}. Відправка повідомлення..')
                    response = await client.post(url, json=payload, headers=headers_post)
                
                if is_wakeup_call:
                    print(f'[WhatsApp] Бот прокинувся успішно')
                    return {'status': 'awakened'}
                
                response.raise_for_status()

                try:
                    data = response.json()
                except ValueError:
                    data = response.text

                print(f'[WhatsApp] Успішна відповідь={data}')
                return data
            
            except (httpx.TimeoutException, httpx.HTTPStatusError, httpx.RequestError) as e:
                print(f'[WhatsApp] Помилка на спробі {attempt}: {e}')
                
                if attempt < tries:
                    print(f'[WhatsApp] Бот спить... Наступна спроба через {delay} сенкуд')
                    await asyncio.sleep(delay)
                else:
                    print(f'[WhatsApp] Бот не прокинувся за {tries} спроб, щось не так...')
                    raise
                