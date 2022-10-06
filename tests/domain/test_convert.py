import pathlib
import os
import random
import string
from io import BytesIO

import pytest

from text_to_image import PngPilTextImageSaver, PngPilTextImageLoader, TextImage


@pytest.fixture
def saver():
    return PngPilTextImageSaver()


@pytest.fixture()
def loader():
    return PngPilTextImageLoader()


def save_and_load(image, loader, saver):
    saver_data = BytesIO()
    saver.save(saver_data, image)
    saver_data.seek(0)
    loaded = loader.load(saver_data)
    return loaded


@pytest.mark.parametrize('text', [
    'hello, world',
    'nope',
    string.ascii_letters,
    'strange'
])
def test__save_and_load__with_correct_data__saves_and_loads_correctly(saver, loader, text):
    image = TextImage.from_text(text)
    loaded = save_and_load(image, loader, saver)
    assert loaded.text == text


@pytest.mark.parametrize('data', [
    b'a',
    b'asdf',
    b'12',
    bytes(range(3 * 10 + 1)),
    bytes(range(3 * 10 + 2)),
    bytes(range(3 * 10 + 2)),
    b'some string',
    b'rgb\n',
    b'rgb\n\t\b ',
    b'hello, world!!!!*'
])
def test__save_and_load__with_not_aligned_by_pixels_data__saves_and_loads_correctly(saver, loader, data):
    image = TextImage(data)
    loaded = save_and_load(image, loader, saver)
    assert loaded.data == image.data
    assert loaded.text == image.text


def test__save_and_load__with_files__saves_and_loads_correct(saver, loader):
    folder = pathlib.Path(os.path.join(os.path.dirname(__file__), 'convert_data'))
    for file in folder.iterdir():
        with file.open('rt') as f:
            text = ''.join(f.readlines())
            image = TextImage.from_text(text)
            loaded = save_and_load(image, loader, saver)
            assert image.text == loaded.text, f'{f.name} could not be converted correctly'


symbols = f"{string.printable}\n\r\t\b\f"


def generate_random_text(length: int):
    return ''.join(random.choice(symbols) for _ in range(length))


@pytest.mark.parametrize('random_text', [
    generate_random_text(1),
    generate_random_text(10),
    generate_random_text(100),
    generate_random_text(1000),
    generate_random_text(2000),
    generate_random_text(5000),
    generate_random_text(10000),
])
def test__save_and_load__with_random_symbols__saves_and_loads_correctly(saver, loader, random_text):
    image = TextImage.from_text(random_text)
    loaded = save_and_load(image, loader, saver)
    assert image.text == loaded.text
