import math

import numpy as np
from PIL import Image


def to_image(text: str) -> Image.Image:
    if len(text) == 0:
        raise ValueError('Input text is empty')

    encoded = text.encode('utf-8')
    total_pixels = math.ceil(len(encoded) / 3)
    side_size = math.ceil(math.sqrt(total_pixels))
    data = np.zeros((side_size * side_size * 3), dtype=np.uint8)
    data[:len(encoded)] = list(encoded)
    data = data.reshape((side_size, side_size, 3))
    return Image.fromarray(data, mode='RGB')
