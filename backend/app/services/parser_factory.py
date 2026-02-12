import os
from app.services.base_parser import BaseParser
from app.services.pdf_parser import PDFParser
from app.services.docx_parser import DocxParser

class ParserFactory:
    @staticmethod
    def get_parser(file_path: str) -> BaseParser:
        _, ext = os.path.splitext(file_path)
        ext = ext.lower()
        
        if ext == '.pdf':
            return PDFParser()
        elif ext in ['.docx', '.doc']:
            return DocxParser()
        else:
            raise ValueError(f"Desteklenmeyen dosya formatı: {ext}")
