import logging
from http import HTTPStatus
from io import BytesIO

from PIL import Image
from fastapi import APIRouter, Form, HTTPException
from starlette.responses import StreamingResponse, Response

from text_to_image import TextImage, ImageMode
from web.routers.default_image_mode import DEFAULT_IMAGE_MODE
from web.routers.is_image_extension_supported import is_image_extension_supported

text_to_image_router = APIRouter()

logger = logging.getLogger(__name__)


def to_image(text: str, image_mode: ImageMode) -> Image.Image:
    try:
        text_image = TextImage.from_text(text)
    except UnicodeEncodeError as unicode_encode_error:
        logger.warning('Could not create TextImage from text',
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
        logger.warning('Requested saving image with not supported image extension',
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
    if not is_image_extension_supported(image_extension):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Requested image extension is not supported'
        )

    image = to_image(text, DEFAULT_IMAGE_MODE)
    file_content = get_image_file_bytes(image, image_extension=image_extension)
    return StreamingResponse(
        content=file_content,
        media_type=f"image/{image_extension.lower()}",
        status_code=200
    )
