import logging
from http import HTTPStatus
from io import BytesIO

import PIL
from PIL import Image
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from starlette.responses import PlainTextResponse, Response

from text_to_image import TextImage

image_to_text_router = APIRouter()
logger = logging.getLogger(__name__)


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
        in_pixel = bytes(
            byte
            for pixel in pixels
            for byte in pixel
        ).rstrip(b'\0')
        return TextImage(
            in_pixel
        )


@image_to_text_router.post("/api/image/to/text", response_class=PlainTextResponse)
async def post__image_to_text(
        file: UploadFile = File(),
        image_extension: str = Form(default=None,
                                    alias='imageFormat')) -> Response:
    file_bytes = await file.read()

    if not len(file_bytes):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Provided image file is empty'
        )

    if image_extension:
        extension = image_extension
    else:
        extension = file.content_type.split('/')[-1]

    try:
        image = get_text_image(file_bytes, extension)
        return PlainTextResponse(
            image.text,
            status_code=HTTPStatus.OK,
            media_type="text/plain"
        )
    except (ValueError, UnicodeDecodeError) as error:
        logger.warning('Error during converting image',
                       exc_info=error)
        raise HTTPException(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            detail="Could not convert given image to text",
        )
