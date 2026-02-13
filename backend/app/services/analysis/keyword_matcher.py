import re
import json
import os

class KeywordMatcher:
    def __init__(self):
        self.keywords_path = os.path.join(os.path.dirname(__file__), '../../data/keywords.json')
        self.categories = self._load_keywords()

    def _load_keywords(self) -> dict:
        try:
            with open(self.keywords_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading keywords: {e}")
            return {}

    def match(self, text: str) -> dict:
        text_lower = text.lower()
        found_keywords = []
        found_by_category = {}
        
        # Tüm kategorileri düzleştirip arama yap, aynı zamanda kategori bazlı da sakla
        for category, skills in self.categories.items():
            category_matches = []
            for skill in skills:
                # Kelime sınırlarına dikkat ederek arama (bütün kelime eşleşmesi için)
                # Regex escape önemli çünkü skiller özel karakter içerebilir (c# gibi)
                pattern = r'\b' + re.escape(skill) + r'\b'
                if re.search(pattern, text_lower):
                    if skill not in found_keywords:
                        found_keywords.append(skill)
                    category_matches.append(skill)
            
            if category_matches:
                found_by_category[category] = category_matches
        
        return {
            "found_keywords": found_keywords,
            "count": len(found_keywords),
            "by_category": found_by_category
        }
