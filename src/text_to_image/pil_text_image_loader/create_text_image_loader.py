from PIL import Image

from .pil_text_image_loader import PilTextImageLoader

_SUPPORTED_EXTENSIONS: set[str] = {
    ext.lower()
    for _, ext
    in Image.registered_extensions().items()
    if ext in Image.OPEN
}


def create_text_image_loader(extension: str,
                             encoding: str = PilTextImageLoader.DEFAULT_ENCODING) -> PilTextImageLoader:
    extension = extension.lower()
    if extension not in _SUPPORTED_EXTENSIONS:
        raise KeyError(f'Extension {extension!r} is not supported')
    return PilTextImageLoader(format=extension, encoding=encoding)
