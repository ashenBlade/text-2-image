from abc import ABC, abstractmethod
from typing import BinaryIO

from .text_image import TextImage


class TextImageSaver(ABC):
    format: str

    def __init__(self, format: str) -> None:
        self.format = format

    @abstractmethod
    def save(self, fd: BinaryIO, image: TextImage) -> None:
        """Save image to specified file.
        Inherited classes must save image in own format.
        Inherited image savers must override 'save_inner' for actual saving image if necessary"""
