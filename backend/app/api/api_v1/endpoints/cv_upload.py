from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional
import shutil
import os
from tempfile import NamedTemporaryFile
from app.services.parser_factory import ParserFactory

from app.services.analysis_service import AnalysisService

router = APIRouter()
analysis_service = AnalysisService()

@router.post("/upload")
async def upload_cv(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None)
):
    """
    CV yükler, metni çıkarır ve tam analiz yapar.
    """
    allowed_extensions = {".pdf", ".docx", ".doc"}
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Desteklenmeyen dosya formatı. İzin verilenler: {', '.join(allowed_extensions)}")

    with NamedTemporaryFile(delete=False, suffix=file_ext) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        # 1. Metin Çıkarma
        parser = ParserFactory.get_parser(tmp_path)
        text = parser.extract_text(tmp_path)
        
        if not text:
             return {"error": "Metin çıkarılamadı", "filename": file.filename}

        # 2. Analiz Servisi ile İşleme
        analysis_result = analysis_service.analyze_cv(text, job_description)

        return {
            "filename": file.filename,
            "text_preview": text[:200],
            "result": analysis_result
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"İşlem hatası: {str(e)}")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
