from text_to_image.pil_text_image_saver.image_mode import ImageMode
from text_to_image.pil_text_image_saver.pil_text_image_saver import PilTextImageSaver


def create_text_image_saver(format: str, mode: ImageMode = PilTextImageSaver.DEFAULT_MODE) -> PilTextImageSaver:
    return PilTextImageSaver(format, mode)
