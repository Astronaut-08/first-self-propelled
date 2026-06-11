import httpx
from app.core.config import settings


class MetaClient:

    def __init__(self):
        self.base_url = f"https://graph.facebook.com/{settings.META_API_VERSION}"
        self.headers = {"Authorization": f"Bearer {settings.META_ACCESS_TOKEN}"}

    async def send_whatsapp_message(self, to: str, text: str):
        if not settings.META_PHONE_NUMBER_ID:
            raise ValueError("META_PHONE_NUMBER_ID не налаштовано!")

        url = f"{self.base_url}/{settings.META_PHONE_NUMBER_ID}/messages"
        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": text},
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=self.headers)
            return response.json()