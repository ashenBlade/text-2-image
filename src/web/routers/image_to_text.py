import logging
from http import HTTPStatus
from io import BytesIO

import PIL
from PIL import Image
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from starlette.responses import PlainTextResponse, Response

from text_to_image import TextImage
from web.routers.is_image_extension_supported import is_image_extension_supported

image_to_text_router = APIRouter()
logger = logging.getLogger(__name__)


def get_extension(file: UploadFile, image_extension: str):
    if image_extension:
        extension = image_extension
    else:
        extension = file.content_type.split('/')[-1]

    if not is_image_extension_supported(extension):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Requested image extension is not supported'
        )

    return extension


def get_text_image(content: bytes, image_extension: str) -> TextImage:
    with BytesIO(content) as io:
        try:
            image = Image.open(io, mode='r', formats=(image_extension,))
        except PIL.UnidentifiedImageError as unidentified_error:
            logger.warning('Error during file decode', exc_info=unidentified_error)
            raise HTTPException(
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
                detail='Could not open image in specified format'
            )

        pixels = image.getdata()
        data = bytes(
            byte
            for pixel in pixels
            for byte in pixel
        ).rstrip(b'\0')

        return TextImage(
            data
        )


@image_to_text_router.post("/api/image/to/text", response_class=PlainTextResponse)
async def post__image_to_text(
        file: UploadFile = File(),
        image_extension: str = Form(default=None,
                                    alias='imageFormat')) -> Response:
    file_bytes = await read_upload_file(file)
    extension = get_extension(file, image_extension)
    image = get_text_image(file_bytes, extension)
    text = read_text_from_image(image)
    return PlainTextResponse(
        text,
        status_code=HTTPStatus.OK,
        media_type="text/plain"
    )


def read_text_from_image(image: TextImage) -> str:
    try:
        text = image.text
    except (ValueError, UnicodeDecodeError) as error:
        logger.warning('Error during converting image',
                       exc_info=error)
        raise HTTPException(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            detail="Could not convert given image to text",
        )
    return text


async def read_upload_file(file: UploadFile) -> bytes:
    file_bytes = await file.read()
    if not len(file_bytes):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Provided image file is empty'
        )
    return file_bytes
