import re

class ATSScorer:
    def __init__(self):
        # Temel puanlama kriterleri
        self.criteria = {
            "email_exists": 20,
            "phone_exists": 20,
            "text_length_ok": 20, # > 500 karakter
            "education_section": 20,
            "experience_section": 20
        }

    def score(self, text: str) -> dict:
        score = 0
        details = []
        
        # 1. Email Kontrolü
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        if re.search(email_pattern, text):
            score += self.criteria["email_exists"]
            details.append({"pass": True, "msg": "E-posta adresi bulundu."})
        else:
            details.append({"pass": False, "msg": "E-posta adresi bulunamadı."})

        # 2. Telefon Kontrolü (Basit - Geliştirilebilir)
        phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        if re.search(phone_pattern, text):
            score += self.criteria["phone_exists"]
            details.append({"pass": True, "msg": "Telefon numarası bulundu."})
        else:
            details.append({"pass": False, "msg": "Telefon numarası bulunamadı."})

        # 3. Uzunluk Kontrolü
        if len(text) > 500:
            score += self.criteria["text_length_ok"]
            details.append({"pass": True, "msg": "İçerik uzunluğu yeterli."})
        else:
            details.append({"pass": False, "msg": "İçerik çok kısa, daha fazla detay eklenmeli."})

        # 4. Bölüm Kontrolleri (Anahtar kelimelerle tahmin)
        text_lower = text.lower()
        
        if any(keyword in text_lower for keyword in ["eğitim", "education", "okul", "university", "lise"]):
            score += self.criteria["education_section"]
            details.append({"pass": True, "msg": "Eğitim bölümü tespit edildi."})
        else:
            details.append({"pass": False, "msg": "Eğitim bölümü bulunamadı veya belirgin değil."})

        if any(keyword in text_lower for keyword in ["iş deneyimi", "experience", "çalışma", "work history", "kariyer"]):
            score += self.criteria["experience_section"]
            details.append({"pass": True, "msg": "Deneyim bölümü tespit edildi."})
        else:
            details.append({"pass": False, "msg": "Deneyim bölümü bulunamadı."})

        return {
            "total_score": score,
            "details": details
        }
