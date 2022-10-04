import logging
from io import BytesIO
import os

import PIL
from PIL import Image
from fastapi import FastAPI, HTTPException, UploadFile, Form, File, logger
from starlette.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from text_to_image import to_image, to_text

app = FastAPI()

logging.basicConfig(format="%(asctime)s - [%(levelname)s] -  %(name)s - %(filename)s.%(funcName)s - %(message)s")
text_to_image_logger = logging.getLogger('text_to_image')
image_to_text_logger = logging.getLogger('image_to_text')


def text_to_image_inner(text: str, filename: str, extension: str):
    if len(text) == 0:
        raise HTTPException(status_code=400, detail='Input text must not be empty')

    text_to_image_logger.info('Convert of string with length: %i', len(text))
    image = encrypt_to_image(text)
    response = convert_to_byte_io(image)
    filename = f'{filename}.{extension}'
    return StreamingResponse(response, media_type='image/png', status_code=200, headers={
        'Content-Disposition': f'attachment; filename="{filename}"'
    })


@app.get('/api/text/to/image', response_class=StreamingResponse)
async def get__text_to_image(text: str, filename: str = 'encrypted', extension: str = 'png'):
    return text_to_image_inner(text, filename, extension)


@app.post('/api/text/to/image', response_class=StreamingResponse)
async def post__text_to_image(file: UploadFile = File(None),
                              text: str = Form(None),
                              encoding: str = 'utf-8',
                              extension: str = 'png',
                              filename: str = 'encrypted'):
    if file:
        # if file.content_type != 'text/plain':
        #     raise HTTPException(status_code=422, detail='Content type must be "text/plain"')
        filename = filename or file.filename
        bytes = await file.read()
        return text_to_image_inner(bytes.decode(encoding), filename, extension)
    if text:
        return text_to_image_inner(text, filename, extension)
    raise HTTPException(status_code=400, detail='Text or file not provided')



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


SUPPORTED_EXTENSIONS = {
    ex.lstrip('.')
    for ex, f in Image.registered_extensions().items()
    if f in Image.OPEN
}


def is_supported_content_type(content_type: str):
    [image, content_type] = content_type.lower().split('/')
    return image == 'image' and content_type in SUPPORTED_EXTENSIONS


@app.post('/api/image/to/text')
async def post__image_to_text(file: UploadFile):
    image_to_text_logger.warning('Requested convert for file: Content-Type: "%s", Filename: "%s"',
                                 file.content_type,
                                 file.filename)
    image = await convert_to_image(file)
    text = decrypt_image(image)
    return {
        'decrypted': text
    }


def decrypt_image(image: Image):
    try:
        text = to_text(image)
    except ValueError as value:
        image_to_text_logger.warning('Could not convert parsed image to text', exc_info=value)
        raise HTTPException(status_code=400, detail='Can not convert parsed image to text')
    return text


async def convert_to_image(file: UploadFile):
    try:
        content = await file.read()
        image = Image.open(BytesIO(content))
    except PIL.UnidentifiedImageError as unidentified:
        image_to_text_logger.warning('Received image can not be opened and identified', exc_info=unidentified)
        raise HTTPException(status_code=400, detail='Can not parse given image')
    return image

app.mount('/', StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'), html=True), name='static')

