import logging
from http import HTTPStatus
from io import BytesIO

from fastapi import APIRouter, Form, HTTPException, Depends
from starlette.responses import StreamingResponse, Response

from text_to_image import TextImage, TextImageSaver
from web.dependencies import get_text_image_saver

router = APIRouter()

text_to_image_logger = logging.getLogger(__name__)

SUPPORTED_IMAGE_EXTENSIONS = {"png"}


def is_image_extension_supported(image_extension: str) -> bool:
    return image_extension.lower() in SUPPORTED_IMAGE_EXTENSIONS


def write_image_to_bytes_io(text: str, image_saver: TextImageSaver) -> BytesIO:
    try:
        image = TextImage.from_text(text)
        buffer = BytesIO()
        image_saver.save(buffer, image)
        buffer.seek(0)
        return buffer
    except ValueError as value:
        text_to_image_logger.info(
            'Could not convert text to image: "%s"', text, exc_info=value
        )
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail="Could not convert given text. Internal error. Sorry",
        )


@router.post("/api/text/to/image", response_class=StreamingResponse)
async def post__text_to_image(
    text: str = Form(),
    image_extension: str = Form("png"),
    image_saver: TextImageSaver = Depends(get_text_image_saver),
) -> Response:
    if not len(text):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail="Input text must not be empty"
        )

    if not is_image_extension_supported(image_extension):
        raise HTTPException(
            status_code=HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
            detail=f"Image extension '{image_extension}' is not supported",
        )

    text_to_image_logger.info("Convert of string with length: %i", len(text))
    response = write_image_to_bytes_io(text, image_saver)
    return StreamingResponse(
        response,
        media_type=f"image/{image_extension}",
        status_code=200
    )
