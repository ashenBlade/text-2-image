from enum import Enum


class ImageFormat(str, Enum):
    PNG = 'png'
    WEBP = 'webp'

    @classmethod
    def from_string(cls, format: str) -> 'ImageFormat':
        try:
            return _SUPPORTED_EXTENSIONS_DICT[format.strip().lower()]
        except KeyError as key_error:
            raise ValueError('Given format is not supported', format) from key_error


_SUPPORTED_EXTENSIONS_DICT: dict[str, ImageFormat] = {
    ImageFormat.PNG: ImageFormat.PNG,
    ImageFormat.WEBP: ImageFormat.WEBP
}
