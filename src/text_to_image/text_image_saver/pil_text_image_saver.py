from abc import ABC
from typing import BinaryIO

from PIL import Image as PILImage

from text_to_image.domain import TextImageSaver, TextImage


class PilTextImageSaver(TextImageSaver, ABC):
    def save_inner(self, fd: BinaryIO, image: PILImage.Image):
        image.save(fd, self.format)

    def save(self, fd: BinaryIO, image: TextImage) -> None:
        """Inherited  classes must implement save_inner method"""
        pil_image = PILImage.new('RGB', image.size, color=0)
        self.save(fd, pil_image)
