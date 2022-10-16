from typing import TypeAlias, Callable, Protocol

from text_to_image import TextImageSaver
from text_to_image.pil_text_image_saver import create_text_image_saver
from text_to_image.pil_text_image_saver.image_mode import ImageMode


class TextImageSaverFactory(Protocol):
    def __call__(self, format: str, mode: ImageMode = 'RGB') -> TextImageSaver:
        ...


async def get_text_image_saver_factory() -> TextImageSaverFactory:
    return create_text_image_saver
