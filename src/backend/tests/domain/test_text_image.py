import itertools

import pytest

from text_to_image.domain import TextImage


def test__constructor__can_instantiate():
    TextImage(bytes([1, 2, 3]))
    assert True


SIMPLE_TEXT = [
    'hello, world',
    'what, is, going, on??',
    '123',
    'asdfasdf',
    'a' * 30,
    'asdf'
]

TEXT_WITH_SPECIAL_CHARACTERS = [
    '\t\t',
    '\n',
    '\r',
    '\n\r',
    '\a',
    '\b\b\b\b\b\b\b\b\b'
]

@pytest.mark.parametrize('text', SIMPLE_TEXT)
def test__from_text__with_valid_string__can_create_text_image(text: str):
    TextImage.from_text(text)
    assert True


@pytest.mark.parametrize('text', TEXT_WITH_SPECIAL_CHARACTERS)
def test__from_text__with_special_characters__can_create_text_image(text: str):
    TextImage.from_text(text)
    assert True


@pytest.mark.parametrize('text', SIMPLE_TEXT + TEXT_WITH_SPECIAL_CHARACTERS)
def test__text__when_created_using_from_text__returns_same_text(text: str):
    image = TextImage.from_text(text)
    assert image.text == text


def test__constructor__with_empty_input__raises_value_error():
    with pytest.raises(ValueError):
        TextImage(bytes())

    with pytest.raises(ValueError):
        TextImage([])

    with pytest.raises(ValueError):
        TextImage(())


def test__from_text__with_empty_text__raises_value_error():
    with pytest.raises(ValueError):
        TextImage.from_text('')


@pytest.mark.parametrize('encoding, text', itertools.product([
    'ascii',
    'utf-32',
    'utf-16',
    'utf-8',
    'utf-7',
], SIMPLE_TEXT))
def test__from_text__with_different_encodings__returns_same_string_for_text(encoding, text):
    image = TextImage.from_text(text, encoding=encoding)
    assert image.text == text
