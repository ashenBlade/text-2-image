from typing import Generator

from text_to_image import PngPilTextImageSaver, TextImageSaver


def get_text_image_saver() -> Generator[TextImageSaver, None, None]:
    yield PngPilTextImageSaver()
