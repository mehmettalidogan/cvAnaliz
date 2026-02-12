from app.services.analysis.ats_scorer import ATSScorer
from app.services.analysis.keyword_matcher import KeywordMatcher
from app.services.analysis.content_analyzer import ContentAnalyzer
from app.services.analysis.regex_extractor import RegexExtractor

class AnalysisService:
    def __init__(self):
        self.ats_scorer = ATSScorer()
        self.keyword_matcher = KeywordMatcher()
        self.content_analyzer = ContentAnalyzer()
        self.regex_extractor = RegexExtractor()

    def analyze_cv(self, text: str) -> dict:
        # 1. Veri Çıkarma
        extracted_data = self.regex_extractor.extract(text)
        
        # 2. ATS Puanlama
        ats_result = self.ats_scorer.score(text)
        
        # 3. Anahtar Kelime Analizi
        keyword_result = self.keyword_matcher.match(text)
        
        # 4. İçerik Analizi (Güçlü/Zayıf Yönler)
        content_result = self.content_analyzer.analyze(text, ats_result, keyword_result)

        return {
            "extracted_data": extracted_data,
            "ats_score": ats_result,
            "keywords": keyword_result,
            "analysis": content_result
        }
