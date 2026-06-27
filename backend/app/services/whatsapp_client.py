import httpx
from app.core.config import settings


async def send_whatsapp_message(text: str, to: str = settings.WA_GROUP_ID):
    url = settings.SEND_MSG_URL
    headers = {
        'apikey': settings.SECRET_KEY,
        'Content-type': 'application/json'
    }
    payload = {
        'number': to,
        'text': text,
        'delay': 1200,
        'presence': 'composing'
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()