from typing import List, Dict

class JobMatcher:
    def match(self, cv_keywords: List[str], job_keywords: List[str]) -> Dict:
        if not job_keywords:
            return {
                "match_score": 0,
                "missing_keywords": [],
                "matching_keywords": []
            }

        # Set ile eşleşenleri bul
        cv_set = set(k.lower() for k in cv_keywords)
        job_set = set(k.lower() for k in job_keywords)
        
        matching = list(cv_set.intersection(job_set))
        missing = list(job_set.difference(cv_set))
        
        # Basit skor hesaplama: (Eşleşen / İlandaki Toplam) * 100
        score = int((len(matching) / len(job_set)) * 100) if job_set else 0

        return {
            "match_score": score,
            "missing_keywords": missing,
            "matching_keywords": matching
        }
