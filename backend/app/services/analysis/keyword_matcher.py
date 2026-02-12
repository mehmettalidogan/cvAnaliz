import re

class KeywordMatcher:
    def __init__(self):
        # Şimdilik statik bir liste. İleride veritabanından veya dosyadan okunabilir.
        self.common_skills = [
            "python", "java", "react", "javascript", "typescript", "c#", ".net", "sql", "nosql",
            "docker", "kubernetes", "aws", "azure", "gcp", "git", "linux", "agile", "scrum",
            "communication", "teamwork", "leadership", "problem solving",
            "iletişim", "takım çalışması", "liderlik", "problem çözme"
        ]

    def match(self, text: str) -> dict:
        text_lower = text.lower()
        found_keywords = []
        
        for skill in self.common_skills:
            # Kelime sınırlarına dikkat ederek arama (bütün kelime eşleşmesi için)
            # Regex escape önemli çünkü skiller özel karakter içerebilir (c# gibi)
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, text_lower):
                found_keywords.append(skill)
        
        # Basitçe bulunanları döndür
        return {
            "found_keywords": found_keywords,
            "count": len(found_keywords)
        }
