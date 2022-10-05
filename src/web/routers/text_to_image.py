import logging
from http import HTTPStatus
from io import BytesIO

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from starlette.responses import StreamingResponse

from text_to_image import TextImage, PngPilTextImageSaver

router = APIRouter()

text_to_image_logger = logging.getLogger(__name__)

SUPPORTED_IMAGE_EXTENSIONS = {
    'png'
}


def is_image_supported(image_extension: str):
    return image_extension.lower() in SUPPORTED_IMAGE_EXTENSIONS


def write_image_to_bytes_io(text: str) -> BytesIO:
    try:
        image = TextImage.from_text(text)
        buffer = BytesIO()
        PngPilTextImageSaver().save(buffer, image)
        buffer.seek(0)
        return buffer
    except ValueError as value:
        text_to_image_logger.info('Could not convert text to image: "%s"', text, exc_info=value)
        raise HTTPException(status_code=500, detail='Could not convert given text. Internal error. Sorry')


def create_headers_for_file_response(filename: str):
    return {
        'Content-Disposition': f'attachment; filename="{filename}"'
    }


def text_to_image_internal(text: str, filename: str, extension: str):
    if len(text) == 0:
        raise HTTPException(status_code=400,
                            detail='Input text must not be empty')

    if not is_image_supported(extension):
        raise HTTPException(status_code=HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
                            detail=f"Image extension '{extension}' is not supported")

    text_to_image_logger.info('Convert of string with length: %i', len(text))
    response = write_image_to_bytes_io(text)
    return StreamingResponse(response,
                             media_type=f'image/{extension}',
                             status_code=200,
                             headers=create_headers_for_file_response(filename))


@router.post('/api/text/to/image', response_class=StreamingResponse)
async def post__text_to_image(file: UploadFile = File(None),
                              text: str = Form(None),
                              image_extension: str = 'png',
                              filename: str = None):
    default_encoding = 'utf-8'
    default_filename = 'encrypted'

    def get_filename():
        filename_inner = filename or (file.filename if file else default_filename)
        return f'{filename_inner}.{image_extension}'

    async def get_file_content_text():
        try:
            file_contents = await file.read()
            decoded = file_contents.decode(default_encoding)
            return decoded
        except UnicodeDecodeError:
            raise HTTPException(status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
                                detail="Could not parse input file. "
                                       f"File encoding must be '{default_encoding}'")

    if text and file:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail='Choose either file or plain text')

    if file:
        return text_to_image_internal(await get_file_content_text(),
                                      get_filename(),
                                      image_extension)

    if text:
        return text_to_image_internal(text,
                                      get_filename(),
                                      image_extension)

    raise HTTPException(status_code=400,
                        detail='Text or file not provided')



