import itertools
from io import BytesIO

import imghdr

import PIL.Image
import pytest

from text_to_image import TextImage, PngPilTextImageSaver


@pytest.fixture
def saver():
    return PngPilTextImageSaver()


def save_data(image, saver):
    saver_data = BytesIO()
    saver.save(saver_data, image)
    saver_data.seek(0)
    return saver_data


@pytest.mark.parametrize('text', [
    'sample text',
    'hello, world',
    '123123',
    '''#include <iostream>

int main() {
    std::cout << "Hello, world" << std::endl;
    return 0;
}
'''
])
def test__save__with_valid_image__save_image_in_png_format(saver, text):
    image = TextImage.from_text(text)
    saver_data = save_data(image, saver)
    actual_format = imghdr.what(None, saver_data.read())
    assert actual_format.lower() == 'png'


@pytest.mark.parametrize('data', [
    bytes([1, 1]),
    bytes([1, 1, 1, 1]),
    bytes([1, 1, 2, 23, 12]),
    bytes(itertools.repeat(12, 3 * 10 + 1)),
])
def test__save__with_not_aligned_by_pixels_data__save_correctly(saver, data):
    image = TextImage(data)
    saver_data = save_data(image, saver)
    pil_image = PIL.Image.frombytes(PngPilTextImageSaver.DEFAULT_MODE, image.size, saver_data.read())

