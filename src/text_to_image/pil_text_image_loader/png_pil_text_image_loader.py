from .pil_text_image_loader import PilTextImageLoader


class PngPilTextImageLoader(PilTextImageLoader):
    def __init__(self, encoding: str = PilTextImageLoader.DEFAULT_ENCODING):
        super().__init__("png", encoding)
