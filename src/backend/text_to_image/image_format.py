from collections import UserString
from typing import Any


class ImageFormat(UserString):
    PNG: 'ImageFormat'
    WEBP: 'ImageFormat'

    save_options: dict[str, Any] = {}

    def __init__(self, name: str, save_options: dict[str, Any] = None):
        super().__init__(name)
        if save_options:
            self.save_options = save_options

    @property
    def name(self) -> str:
        return self.data

    @staticmethod
    def parse(format_str: str) -> 'ImageFormat':
        try:
            return _SUPPORTED_EXTENSIONS_DICT[format_str.strip().lower()]
        except KeyError as key_error:
            raise ValueError('Given format is not supported', format_str) from key_error


ImageFormat.PNG = ImageFormat('png')
ImageFormat.WEBP = ImageFormat('webp', {'lossless': True})


_SUPPORTED_EXTENSIONS_DICT: dict[str, ImageFormat] = {
    ImageFormat.PNG.name: ImageFormat.PNG,
    ImageFormat.WEBP.name: ImageFormat.WEBP
}
