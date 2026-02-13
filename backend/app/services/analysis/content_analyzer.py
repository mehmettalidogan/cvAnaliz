import re

class ContentAnalyzer:
    def analyze(self, text: str, ats_result: dict, keyword_result: dict, job_match_result: dict = None) -> dict:
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

        # İş İlanı Eşleşmesi Analizi
        if job_match_result:
            if job_match_result["match_score"] >= 70:
                strengths.append(f"İş ilanı ile uyumunuz yüksek (%{job_match_result['match_score']}).")
            elif job_match_result["match_score"] < 40:
                missing = ", ".join(job_match_result["missing_keywords"][:5])
                weaknesses.append(f"İş ilanı ile uyumunuz düşük. Eksik anahtar kelimeler: {missing}...")

        # Etki Analizi (Sayisal veriler ve güçlü fiiller)
        # Örn: "%20 artış", "5 proje", "1000+ kullanıcı"
        impact_patterns = [
            r'%\d+',           # %20
            r'\d+%',           # 20%
            r'\d+\+',          # 100+
            r'\d+\s+(kullanıcı|user|müşteri|client|proje|project|tla|tl|dolar|euro|usd|eur)' # 5 proje
        ]
        
        impact_score = 0
        for pattern in impact_patterns:
            matches = re.findall(pattern, text)
            impact_score += len(matches)

        if impact_score > 2:
            strengths.append("Başarılarınızı somutlaştıran sayısal veriler (Etki Analizi) kullandınız.")
        else:
            weaknesses.append("Deneyimlerinizde daha fazla sayısal veri (örn: '%20 verimlilik artışı') kullanarak etkinizi somutlaştırın.")

        # Ekstra Kontroller
        if "linkedin" not in text.lower():
            weaknesses.append("Profesyonel ağ profili (LinkedIn) bağlantısı bulunamadı.")
        
        if "github" not in text.lower() and any(k in text.lower() for k in ["yazılım", "software", "developer", "geliştirici"]):
             weaknesses.append("Yazılım pozisyonları için GitHub veya portfolyo linki eksik.")

        # Dil Bilgisi / İmla (Basit Kontrol)
        # "veya" yerine "yada" kullanımı (hatalı)
        if re.search(r'\byada\b', text, re.IGNORECASE):
             weaknesses.append("'yada' kelimesi hatalı yazılmış olabilir, 'ya da' şeklinde kullanınız.")

        return {
            "strengths": strengths,
            "weaknesses": weaknesses,
            "impact_score": impact_score
        }
