import logging
from http import HTTPStatus
from io import BytesIO

from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from starlette.responses import PlainTextResponse, Response

from web.dependencies import get_text_image_loader_factory, TextImageLoaderFactory


router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/api/image/to/text", response_class=PlainTextResponse)
async def post__image_to_text(
    file: UploadFile = File(),
    text_image_loader_factory: TextImageLoaderFactory = Depends(get_text_image_loader_factory),
) -> Response:
    if not file:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail="Image file not provided"
        )

    extension = file.content_type.split('/')[-1]
    try:
        image_loader = text_image_loader_factory(extension)
    except KeyError as key_error:
        logger.warning('Could not create image loader for file with content type: %s',
                       file.content_type,
                       exc_info=key_error)
        raise HTTPException(
            status_code=HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
            detail=f'Image with given extension is not supported'
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
            image.text,
            status_code=HTTPStatus.OK,
            media_type="text/plain"
        )
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            detail="Could not convert given image to text",
        )
