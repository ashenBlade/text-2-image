from enum import Enum

# ImageMode: TypeAlias = Literal[
#     "1", "CMYK", "F", "HSV", "I", "L", "LAB", "P", "RGB", "RGBA", "RGBX", "YCbCr"
# ]


class ImageMode(str, Enum):
    RGB = 'RGB'


