from abc import ABC
from typing import BinaryIO

from PIL import Image as PILImage  # type: ignore

from text_to_image.domain import TextImageSaver, TextImage
from .image_mode import ImageMode


class PilTextImageSaver(TextImageSaver, ABC):
    DEFAULT_MODE: ImageMode = "RGB"

    def __init__(self, format: str, mode: ImageMode = DEFAULT_MODE):
        super().__init__(format)
        self.image_mode = mode

    def save(self, fd: BinaryIO, image: TextImage) -> None:
        pil_image = PILImage.new(mode=self.image_mode, size=image.size, color=(0, 0, 0))

        def flattened_image_data():
            it = iter(image.data)
            first, second, third = None, None, None
            while True:
                try:
                    first = next(it)
                    second = next(it)
                    third = next(it)
                    yield first, second, third
                    first, second, third = None, None, None
                except StopIteration:
                    # incorrect data-pixel alignment
                    if first:
                        yield first, (second or 0), (third or 0)

                    break

        pil_image.putdata(list(flattened_image_data()))
        pil_image.save(fd, format=self.format)
