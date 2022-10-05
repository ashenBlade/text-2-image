from abc import ABC
from typing import BinaryIO

from PIL import Image as PILImage  # type: ignore

from text_to_image.domain import TextImageSaver, TextImage
from .image_mode import ImageMode


class PilTextImageSaver(TextImageSaver, ABC):
    DEFAULT_MODE: ImageMode = 'RGB'

    def __init__(self, format: str, mode: ImageMode = DEFAULT_MODE):
        super().__init__(format)
        self.image_mode = mode

    def save_inner(self, fd: BinaryIO, image: PILImage.Image):
        image.save(fd, self.format)

    def save(self, fd: BinaryIO, image: TextImage) -> None:
        """Inherited  classes must implement save_inner method"""
        pil_image = PILImage.new(self.image_mode, image.size, color=0)
        self.save_inner(fd, pil_image)
