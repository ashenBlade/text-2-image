from typing import TypeAlias, Callable

from text_to_image import TextImageLoader
from text_to_image.pil_text_image_loader import create_text_image_loader as create_pil_loader

TextImageLoaderFactory: TypeAlias = Callable[[str], TextImageLoader]  # type: ignore


async def get_text_image_loader_factory() -> TextImageLoaderFactory:
    return create_pil_loader
