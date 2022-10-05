from typing import BinaryIO

from text_to_image import TextImage
from text_to_image.domain.text_image_loader import TextImageLoader
from PIL import Image as PILImage


class PilTextImageLoader(TextImageLoader):
    DEFAULT_ENCODING = 'utf-8'

    def __init__(self, format: str, encoding: str = DEFAULT_ENCODING):
        super().__init__(format)
        self.encoding = encoding

    def load(self, fd: BinaryIO) -> TextImage:
        pil_image = PILImage.open(fd)
        loaded = pil_image.tobytes()
        return TextImage(loaded)
