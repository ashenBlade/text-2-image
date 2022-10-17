from typing import BinaryIO, Generator, Iterable

from text_to_image import TextImage
from text_to_image.domain.text_image_loader import TextImageLoader
from PIL import Image as PILImage


def _flatten_pixels(pixels: Iterable[tuple[int, ...]]) -> Generator[int, None, None]:
    pixel: tuple[int, ...]
    for pixel in pixels:
        yield from pixel


class PilTextImageLoader(TextImageLoader):
    DEFAULT_ENCODING = "utf-8"

    def __init__(self, format: str, encoding: str = DEFAULT_ENCODING):
        super().__init__(format)
        self.encoding = encoding

    def load(self, fd: BinaryIO) -> TextImage:
        print(self.format)

        pil_image = PILImage.open(fd, mode='r', formats=(self.format,))
        image_data = pil_image.getdata()
        return TextImage(bytes(_flatten_pixels(image_data)).rstrip(b"\0"))
