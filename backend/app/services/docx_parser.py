from app.services.base_parser import BaseParser
import docx

class DocxParser(BaseParser):
    def extract_text(self, file_path: str) -> str:
        try:
            doc = docx.Document(file_path)
            full_text = []
            for para in doc.paragraphs:
                full_text.append(para.text)
            return '\n'.join(full_text)
        except Exception as e:
            print(f"DOCX okuma hatası: {e}")
            return ""

    def parse(self, text: str) -> dict:
        # Benzer şekilde, ileride detaylandırılacak
        return {
            "raw_text": text,
            "parsed_data": {}
        }
