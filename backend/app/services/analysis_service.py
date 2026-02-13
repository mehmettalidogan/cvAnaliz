from app.services.analysis.ats_scorer import ATSScorer
from app.services.analysis.keyword_matcher import KeywordMatcher
from app.services.analysis.content_analyzer import ContentAnalyzer
from app.services.analysis.regex_extractor import RegexExtractor
from app.services.analysis.job_matcher import JobMatcher

class AnalysisService:
    def __init__(self):
        self.ats_scorer = ATSScorer()
        self.keyword_matcher = KeywordMatcher()
        self.content_analyzer = ContentAnalyzer()
        self.regex_extractor = RegexExtractor()
        self.job_matcher = JobMatcher()

    def analyze_cv(self, text: str, job_description: str = None) -> dict:
        # 1. Veri Çıkarma
        extracted_data = self.regex_extractor.extract(text)
        
        # 2. ATS Puanlama
        ats_result = self.ats_scorer.score(text)
        
        # 3. Anahtar Kelime Analizi (CV için)
        keyword_result = self.keyword_matcher.match(text)
        
        # 4. İş İlanı Eşleşmesi (Varsa)
        job_match_result = None
        if job_description:
            # İş ilanındaki anahtar kelimeleri de buluyoruz
            job_keywords_data = self.keyword_matcher.match(job_description)
            job_keywords = job_keywords_data["found_keywords"]
            
            # Eşleştirme yapıyoruz
            job_match_result = self.job_matcher.match(
                keyword_result["found_keywords"], 
                job_keywords
            )
        
        # 5. İçerik Analizi (Güçlü/Zayıf Yönler)
        # content_analyzer artık job_match_result'ı da kullanabilir
        content_result = self.content_analyzer.analyze(text, ats_result, keyword_result, job_match_result)

        return {
            "extracted_data": extracted_data,
            "ats_score": ats_result,
            "keywords": keyword_result,
            "job_match": job_match_result,
            "analysis": content_result
        }
