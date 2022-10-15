from typing import Generator

from text_to_image import PngPilTextImageLoader, TextImageLoader


def get_text_image_loader() -> Generator[TextImageLoader, None, None]:
    yield PngPilTextImageLoader()
