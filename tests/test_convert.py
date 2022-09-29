import pytest

from text_to_image import to_image, to_text


SAMPLE_TEXTS_ENGLISH = [
    'hello, world',
    'sample text',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'what is going on',
]


@pytest.mark.parametrize('original', SAMPLE_TEXTS_ENGLISH)
def test__back_convert__with_english_text__return_same_text(original: str):
    converted = to_text(to_image(original))
    assert converted == original

