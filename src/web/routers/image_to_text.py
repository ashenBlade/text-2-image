import logging
from io import BytesIO

from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from starlette.responses import PlainTextResponse

from text_to_image.domain import TextImageLoader
from web.dependencies import get_text_image_loader

SUPPORTED_IMAGE_EXTENSIONS = {
    'png'
}


def is_image_supported(image_extension: str):
    return image_extension.lower() in SUPPORTED_IMAGE_EXTENSIONS


def create_headers_for_file_response(filename: str):
    return {
        'Content-Disposition': f'attachment; filename="{filename}"'
    }


router = APIRouter()
logger = logging.getLogger(__name__)


@router.post('/api/image/to/text', response_class=PlainTextResponse)
async def post__image_to_text(file: UploadFile = File(),
                              image_loader: TextImageLoader = Depends(get_text_image_loader)):
    async def extract_text_image():
        if not file:
            raise HTTPException(status_code=400, detail='File not provided')

        file_bytes = await file.read()
        if not file_bytes:
            raise HTTPException(status_code=400, detail='Provided file is empty')

        io = BytesIO(file_bytes)
        return image_loader.load(io)

    def format_response_filename():
        split = file.filename.rstrip('.').split('.')
        if len(split) > 2 and split[-2].lower() == 'txt':
            return '.'.join(split[:-1:1])
        return f'{file.filename}.txt'

    try:
        image = await extract_text_image()
        return PlainTextResponse(image.text,
                                 status_code=200,
                                 media_type='text/plain',
                                 headers=create_headers_for_file_response(format_response_filename()))
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(status_code=422, detail='Could not convert given image to text')



