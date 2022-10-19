import logging
from http import HTTPStatus
from io import BytesIO

import PIL
from PIL import Image
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from starlette.responses import PlainTextResponse, Response

from text_to_image import TextImage, ImageFormat

image_to_text_router = APIRouter()
logger = logging.getLogger(__name__)


def get_image_format(file: UploadFile, image_extension: str) -> ImageFormat:
    if image_extension:
        extension = image_extension
    else:
        extension = file.content_type.split('/')[-1]

    try:
        return ImageFormat.from_string(extension)
    except ValueError as value_error:
        logger.warning('Could not get ImageFormat from provided extension', exc_info=value_error)
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Requested image extension is not supported'
        )


def get_text_image(content: bytes, image_format: ImageFormat) -> TextImage:
    with BytesIO(content) as io:
        try:
            image = Image.open(io, mode='r', formats=(image_format,))
        except PIL.UnidentifiedImageError as unidentified_error:
            logger.warning('Error during file decode', exc_info=unidentified_error)
            raise HTTPException(
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
                detail='Could not open image in specified format'
            )

        pixels = image.getdata()
        encoded_text = bytes(
            byte
            for pixel in pixels
            for byte in pixel
        ).rstrip(b'\0')

        return TextImage(
            encoded_text
        )


@image_to_text_router.post("/api/image/to/text", response_class=PlainTextResponse)
async def post__image_to_text(
        file: UploadFile = File(),
        image_extension: str = Form(default=None,
                                    alias='imageFormat')) -> Response:
    file_bytes = await read_upload_file(file)
    image_format = get_image_format(file, image_extension)
    image = get_text_image(file_bytes, image_format)
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
