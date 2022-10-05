from io import BytesIO

import imghdr
import pytest

from text_to_image import TextImage, PngPilTextImageSaver


@pytest.fixture
def saver():
    return PngPilTextImageSaver()


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
    image = TextImage.from_text('text')

    saver_data = BytesIO()
    saver.save(saver_data, image)
    saver_data.seek(0)

    actual_format = imghdr.what(None, saver_data.read())
    assert actual_format.lower() == 'png'
