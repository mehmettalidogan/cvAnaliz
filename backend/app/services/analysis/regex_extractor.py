import re

class RegexExtractor:
    def extract(self, text: str) -> dict:
        return {
            "email": self._extract_email(text),
            "phone": self._extract_phone(text),
            "links": self._extract_links(text),
            # Bölüm ayrıştırma (segmentation) daha karmaşık olabilir, şimdilik basit tutuyoruz
        }

    def _extract_email(self, text: str) -> str:
        pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        match = re.search(pattern, text)
        return match.group(0) if match else None

    def _extract_phone(self, text: str) -> str:
        # Genişletilmiş telefon regex'i
        pattern = r'(\+?90|0)?\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{2}\s*[0-9]{2}' 
        # Basit bir eşleşme, format çok değişken olabilir
        match = re.search(pattern, text)
        return match.group(0) if match else None

    def _extract_links(self, text: str) -> list:
        pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
        return re.findall(pattern, text)
