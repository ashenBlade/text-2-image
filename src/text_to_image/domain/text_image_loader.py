from abc import ABC, abstractmethod
from typing import BinaryIO

from .text_image import TextImage


class TextImageLoader(ABC):
    format: str

    def __init__(self, format: str) -> None:
        self.format = format

    @abstractmethod
    def load(self, fd: BinaryIO) -> TextImage:
        """Load image to specified byte stream.
        Inherited classes must load image from their own format"""