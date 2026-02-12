from app.services.base_parser import BaseParser
from pdfminer.high_level import extract_text as pdf_extract_text
import re

class PDFParser(BaseParser):
    def extract_text(self, file_path: str) -> str:
        try:
            return pdf_extract_text(file_path)
        except Exception as e:
            # Hata yönetimi burada geliştirilebilir (Logging vs)
            print(f"PDF okuma hatası: {e}")
            return ""

    def parse(self, text: str) -> dict:
        # Regex ile temel ayrıştırma işlemleri yapılacak
        # Şimdilik sadece ham metni döndürüyoruz, ileriki adımda detaylandırılacak
        return {
            "raw_text": text,
            "parsed_data": {} 
        }
