import logging
from io import BytesIO

import PIL
from PIL import Image
from fastapi import FastAPI, File, HTTPException
from starlette.responses import StreamingResponse

from text_to_image import to_image, to_text

app = FastAPI()

logging.basicConfig(format="%(asctime)s - [%(levelname)s] -  %(name)s - %(filename)s.%(funcName)s - %(message)s")
text_to_image_logger = logging.getLogger('text_to_image')
image_to_text_logger = logging.getLogger('image_to_text')


@app.post('/api/text/to/image', response_class=StreamingResponse)
async def get__text_to_image(text: str, filename: str = None, extension: str = 'png'):
    if len(text) == 0:
        raise HTTPException(status_code=400, detail='Input text must not be empty')

    text_to_image_logger.info('Convert of string with length: %i', len(text))
    image = encrypt_to_image(text)
    response = convert_to_byte_io(image)
    filename = filename or f'text-to-image.{extension}'
    return StreamingResponse(response, media_type='image/png', status_code=200, headers={
        'Content-Disposition': f'attachment; filename="{filename}"'
    })


def convert_to_byte_io(image):
    response = BytesIO()
    image.save(response, format='PNG')
    response.seek(0)
    return response


def encrypt_to_image(text):
    try:
        return to_image(text)
    except ValueError as value:
        text_to_image_logger.info('Could not convert text to image: "%s"', text, exc_info=value)
        raise HTTPException(status_code=500, detail='Could not convert given text. Internal error. Sorry')


@app.post('/api/image/to/text')
async def get__image_to_text(file: bytes = File()):
    image_to_text_logger.info('File length: %i', len(file))
    image = convert_to_image(file)
    text = decrypt_image(image)
    return {
        'text': text
    }


def decrypt_image(image):
    try:
        text = to_text(image)
    except ValueError as value:
        image_to_text_logger.warning('Could not convert parsed image to text', exc_info=value)
        raise HTTPException(status_code=400, detail='Can not convert parsed image to text')
    return text


def convert_to_image(file):
    try:
        image = Image.open(BytesIO(file))
    except PIL.UnidentifiedImageError as unidentified:
        image_to_text_logger.warning('Received image can not be opened and identified', exc_info=unidentified)
        raise HTTPException(status_code=400, detail='Can not parse given image')
    return image
