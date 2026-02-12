class ContentAnalyzer:
    def analyze(self, text: str, ats_result: dict, keyword_result: dict) -> dict:
        strengths = []
        weaknesses = []

        # ATS Sonuçlarından çıkarımlar
        if ats_result["total_score"] >= 80:
            strengths.append("CV formatı ve içeriği ATS standartlarına oldukça uygun.")
        elif ats_result["total_score"] < 40:
            weaknesses.append("CV ATS uyumluluğu düşük, temel bölümler eksik olabilir.")

        # Anahtar Kelime analizinden çıkarımlar
        if keyword_result["count"] > 5:
            strengths.append(f"Güçlü bir teknik/yetkinlik kelime havuzu tespit edildi ({keyword_result['count']} anahtar kelime).")
        else:
            weaknesses.append("Anahtar kelime kullanımı zayıf. İlgili pozisyon için daha fazla teknik terim eklenebilir.")

        # Ekstra Kontroller
        if "linkedin" not in text.lower():
            weaknesses.append("Profesyonel ağ profili (LinkedIn) bağlantısı bulunamadı.")
        
        if "github" not in text.lower() and any(k in text.lower() for k in ["yazılım", "software", "developer", "geliştirici"]):
             weaknesses.append("Yazılım pozisyonları için GitHub veya portfolyo linki eksik.")

        return {
            "strengths": strengths,
            "weaknesses": weaknesses
        }
