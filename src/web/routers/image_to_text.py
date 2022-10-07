import logging
from http import HTTPStatus
from io import BytesIO

from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from starlette.responses import PlainTextResponse, Response

from text_to_image.domain import TextImageLoader
from web.dependencies import get_text_image_loader

SUPPORTED_IMAGE_EXTENSIONS = {"png"}


def is_image_supported(image_extension: str) -> bool:
    return image_extension.lower() in SUPPORTED_IMAGE_EXTENSIONS


router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/api/image/to/text", response_class=PlainTextResponse)
async def post__image_to_text(
    file: UploadFile = File(),
    image_loader: TextImageLoader = Depends(get_text_image_loader),
) -> Response:
    if not file:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail="Image file not provided"
        )

    file_bytes = await file.read()

    if not len(file_bytes):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail="Provided image file is empty"
        )

    io = BytesIO(file_bytes)

    try:
        image = image_loader.load(io)
        return PlainTextResponse(
            image.text, status_code=HTTPStatus.OK, media_type="text/plain"
        )
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            detail="Could not convert given image to text",
        )
