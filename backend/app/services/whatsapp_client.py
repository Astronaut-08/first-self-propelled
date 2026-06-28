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

    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        tries = 10
        delay = 15

        for attempt in range(1, tries + 1):
            try:
                print(f'[WhatsApp] Спроба={attempt}. Відправка повідомлення..')
                response = await client.post(url, json=payload, headers=headers_post)
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
                