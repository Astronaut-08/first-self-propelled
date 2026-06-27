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

    print(f'[WhatsApp] Sending message to={to} url={url} text_len={len(text)}')
    print(f'[WhatsApp] Payload={payload}')

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(url, json=payload, headers=headers)
        print(f'[WhatsApp] HTTP status={response.status_code} response_text={response.text}')
        response.raise_for_status()
        try:
            data = response.json()
        except ValueError:
            data = response.text
        print(f'[WhatsApp] Parsed response={data}')
        return data