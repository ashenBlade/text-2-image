import logging
import os

from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from .routers import (
    image_to_text_router,
    text_to_image_router
)

logging.basicConfig(format="%(asctime)s - [%(levelname)s] -  %(name)s - %(filename)s.%(funcName)s - %(message)s")


def create_app():
    fast_api = FastAPI()
    fast_api.include_router(image_to_text_router)
    fast_api.include_router(text_to_image_router)
    fast_api.mount('/',
                   StaticFiles(directory=os.path.join(os.path.dirname(__file__), 'static'),
                               html=True))
    return fast_api


app = create_app()
