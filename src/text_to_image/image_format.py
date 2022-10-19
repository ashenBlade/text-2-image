from enum import Enum


class ImageFormat(str, Enum):
    PNG = 'png'
    WEBP = 'webp'

    @classmethod
    def from_string(cls, format: str) -> 'ImageFormat':
        try:
            return {
                ImageFormat.PNG: ImageFormat.PNG,
                ImageFormat.WEBP: ImageFormat.WEBP
            }[format.strip().lower()]  # type: ignore
        except KeyError as key_error:
            raise ValueError('Given format is not supported', format) from key_error
