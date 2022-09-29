from PIL.Image import Image


def to_text(image: Image) -> str:
    decoded = image.tobytes().decode('utf-8')
    return decoded.rstrip('\0')
