from .image_mode import ImageMode
from .pil_text_image_saver import PilTextImageSaver


class PngPilTextImageSaver(PilTextImageSaver):
    def __init__(self, mode: ImageMode = PilTextImageSaver.DEFAULT_MODE):
        super().__init__('PNG', mode)
