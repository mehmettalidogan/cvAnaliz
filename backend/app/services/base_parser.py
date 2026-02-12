from abc import ABC, abstractmethod
from typing import Any

class BaseParser(ABC):
    """
    Tüm dosya ayrıştırıcılar için temel soyut sınıf.
    Yeni dosya formatları eklendiğinde bu sınıf genişletilmelidir (Open/Closed Principle).
    """

    @abstractmethod
    def extract_text(self, file_path: str) -> str:
        """
        Dosyadan ham metni çıkarır.
        """
        pass

    @abstractmethod
    def parse(self, text: str) -> dict:
        """
        Ham metni işleyerek yapılandırılmış veriye dönüştürür.
        """
        pass
