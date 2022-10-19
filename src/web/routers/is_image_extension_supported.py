_SUPPORTED_EXTENSIONS = {
    'png',
    'webp'
}


def is_image_extension_supported(extension: str) -> bool:
    return extension.lower() in _SUPPORTED_EXTENSIONS
