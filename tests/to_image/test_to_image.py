import pytest
from PIL.Image import Image

from src.text_to_image import to_image


SAMPLE_STRINGS = [
    'string',
    'hello, world',
    'sample, string'
]


@pytest.mark.parametrize('text', SAMPLE_STRINGS)
def test__with_simple_string__do_not_raise_anything(text):
    to_image(text)
    assert True


@pytest.mark.parametrize('text', SAMPLE_STRINGS)
def test__with_simple_string__return_image_instance(text):
    image = to_image(text)
    assert isinstance(image, Image)


def test__with_zero_string__raise_value_error():
    with pytest.raises(ValueError):
        to_image('')
