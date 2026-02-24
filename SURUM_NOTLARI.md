# CV Analiz Pro - Sürüm Notları

Bu belgede CV Analiz Pro uygulamasının gelişim süreci ve eklenen özellikler yer almaktadır.

## [1.0.0] - İlk Sürüm

### Özellikler
- **Çoklu Format Desteği**: PDF ve DOCX formatındaki CV'leri yükleyebilme.
- **ATS Skoru Hesaplama**: CV'nin aday takip sistemlerine (ATS) uygunluğunu ölçme.
- **Temel Veri Çıkarma**: İletişim bilgileri, LinkedIn ve GitHub linklerinin otomatik tespiti.
- **Güçlü ve Zayıf Yön Analizi**: CV içeriğine göre temel gelişim alanlarının belirlenmesi.
- **Anahtar Kelime Tespiti**: CV içindeki teknik terimlerin taranması.
---



## [1.1.0] - 2026-02-13

### Yenilikler
- **İlan Bazlı Eşleşme Analizi**: Artık CV'nizi sadece genel kurallara göre değil, başvuracağınız spesifik bir iş ilanına göre de analiz edebilirsiniz. İş ilanı metnini yapıştırarak CV'nizin o pozisyon için ne kadar uygun olduğunu görebilirsiniz.
- **İçerik ve Etki Analizi**: CV'nizdeki başarıların ne kadar somut olduğunu ölçen "Etki Puanı" sistemi eklendi. Başarılarınızı sayısal verilerle (yüzdeler, sayılar vb.) ifade etme durumunuz analiz edilerek öneriler sunulur.
- **PDF Çıktısı Alabilme**: Analiz sonuçlarını profesyonel bir rapor formatında PDF olarak kaydedebilir ve çıktı alabilirsiniz.
- **Dinamik Yetkinlik Yönetimi**: Uygulamanın yetkinlik (skill) tanıma havuzu genişletildi ve dinamik hale getirildi. Artık çok daha fazla teknik ve sosyal beceriyi otomatik olarak tanıyabiliyor.
- **Yenilenmiş Sonuç Ekranı**: Analiz sonuçları artık daha düzenli bir yapıda; Özet, İş Uyumu, Yetkinlikler ve İçerik Analizi olarak bölümlere ayrıldı.
- **Dil Bilgisi ve Yazım Kontrolü**: CV'nizdeki yaygın yazım yanlışları ve profesyonel üsluba uygun olmayan ifadeler taranarak düzeltme önerileri eklendi.

### İyileştirmeler
- **Kategori Bazlı Gösterim**: Tespit edilen yetkinlikler artık Teknik Beceriler, Yazılım Dilleri, Araçlar ve Soft Skill'ler olarak gruplandırılarak gösteriliyor.
- **Kullanıcı Arayüzü**: Sonuçlar arasında daha rahat gezinebilmeniz için sekmeli (tabs) geçiş sistemi eklendi.

---
## [1.1.1] - 2026-02-24

### Yenilikler
- **"Aura" Tasarım Sistemi**: Standart beyaz mod tamamen kaldırılarak yerine Apple Vision Pro estetiğinde, mesh-gradient arka planlı ve gelişmiş glassmorphism (cam efekti) içeren "Aura" teması eklendi.
- **Kontrollü Ayarlar Paneli**: Ayarlar artık anlık olarak değil, "Kaydet" butonuna basıldığında toplu olarak uygulanır. "İptal" butonu ile değişikliklerden vazgeçme imkanı eklendi.
- **Analiz Tamamlandı Sesi**: Analiz işlemi başarıyla bittiğinde kullanıcıyı bilgilendiren sesli bildirim desteği eklendi (Ayarlar'dan kapatılabilir).
- **Tam İngilizce Desteği**: Uygulama arayüzü, menüler ve yardım içeriği artık tam teşekküllü İngilizce desteğine sahip.

### İyileştirmeler ve Düzeltmeler
- **Görsel Bütünlük**: Tüm bileşenler (Dashboard, Sidebar, Ayarlar, Yardım) yeni Aura tasarım sistemine tam uyumlu hale getirildi.
- **JSX ve Sözdizimi Düzeltmeleri**: Dashboard ve analiz ekranlarındaki yapısal hatalar ve JSX kapanış bozuklukları giderildi.
- **Responsive Cam Efektleri**: Aura temasının saydamlık ve blur efektleri farklı ekran çözünürlükleri için optimize edildi.
- **Versiyon Senkronizasyonu**: Uygulama genelindeki sürüm numaraları v1.1.1 olarak güncellendi.