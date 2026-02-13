# CV Analyzer Çalıştırma Rehberi

Uygulamayı çalıştırmak için iki ayrı terminal (komut satırı) penceresi açmanız gerekmektedir.

### 1. Terminal: Backend (Sunucu)
Backend sunucusunu başlatmak için aşağıdaki komutları sırasıyla çalıştırın:

```powershell
cd backend
python -m uvicorn app.main:app --reload
```
*Sunucu varsayılan olarak `http://127.0.0.1:8000` adresinde çalışacaktır.*

### 2. Terminal: Frontend (Arayüz)
Arayüzü ve Electron uygulamasını başlatmak için aşağıdaki komutları sırasıyla çalıştırın:

```powershell
cd frontend
npm run electron:dev
```

---

### Önemli Notlar
- **Dosya Yolları:** Komutları çalıştırırken doğru klasörde (`backend` veya `frontend`) olduğunuzdan emin olun.
- **Hata Durumu:** Eğer backend "ModuleNotFound" hatası verirse, bağımlılıkları şu komutla tekrar kurun:
  `pip install -r backend/requirements.txt`
- **Port Çakışması:** Sunucu çalışırken terminali kapatırsanız port bazen meşgul kalabilir. Bu durumda terminalde `CTRL+C` ile işlemi durdurup tekrar deneyin.
