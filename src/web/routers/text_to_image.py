import logging
from http import HTTPStatus
from io import BytesIO

from PIL import Image
from fastapi import APIRouter, Form, HTTPException
from starlette.responses import StreamingResponse, Response

from text_to_image import TextImage, ImageMode

text_to_image_router = APIRouter()

text_to_image_logger = logging.getLogger(__name__)
DEFAULT_IMAGE_ENCODE_FORMAT: ImageMode = 'RGB'


def to_image(text: str, image_mode: ImageMode) -> Image.Image:
    try:
        text_image = TextImage.from_text(text)
    except UnicodeEncodeError as unicode_encode_error:
        text_to_image_logger.warning('Could not create TextImage from text',
                                     exc_info=unicode_encode_error)
        raise HTTPException(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            detail='Error during encoding provided text'
        )

    pil_image = Image.new(mode=image_mode,
                          size=text_image.size)
    pil_image.putdata(list(text_image.pixels))
    return pil_image


def get_image_file_bytes(image: Image.Image, image_extension: str = 'png') -> BytesIO:
    buffer = BytesIO()
    try:
        image.save(buffer,
                   format=image_extension,
                   save_all=True,
                   lossless=True)
    except KeyError as key_error:
        text_to_image_logger.warning('Requested saving image with not supported image extension',
                                     exc_info=key_error)
        raise HTTPException(
            status_code=HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
            detail='Requested image format is not supported'
        )
    buffer.seek(0)
    return buffer


@text_to_image_router.post("/api/text/to/image", response_class=StreamingResponse)
async def post__text_to_image(
        text: str = Form(),
        image_extension: str = Form()) -> Response:
    image = to_image(text, DEFAULT_IMAGE_ENCODE_FORMAT)
    file_content = get_image_file_bytes(image, image_extension=image_extension)
    return StreamingResponse(
        content=file_content,
        media_type=f"image/{image_extension.lower()}",
        status_code=200
    )
