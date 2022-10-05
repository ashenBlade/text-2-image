from .pil_text_image_saver import PilTextImageSaver


class PngPilTextImageSaver(PilTextImageSaver):
    def __init__(self):
        super().__init__('PNG')
