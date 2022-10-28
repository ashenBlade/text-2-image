import logging
import os
import sys

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import image_to_text_router, text_to_image_router


logging.basicConfig(
    format="%(asctime)s - "
           "[%(levelname)s] -  "
           "%(name)s - "
           "%(filename)s.%(funcName)s - "
           "%(message)s"
)


def add_cors(fast_api: FastAPI) -> FastAPI:
    origin_environmental_variable = os.environ['ORIGINS']
    if not origin_environmental_variable:
        raise EnvironmentError(
            '"ORIGINS" env variable not provided. '
            'Specify origins delimited by ","'
        )
    origins = origin_environmental_variable.split(',')

    fast_api.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return fast_api


def setup_middleware(fast_api: FastAPI) -> None:
    add_cors(fast_api)


def setup_routers(fast_api: FastAPI) -> None:
    fast_api.include_router(image_to_text_router)
    fast_api.include_router(text_to_image_router)


def create_app() -> FastAPI:
    fast_api = FastAPI()

    setup_middleware(fast_api)
    setup_routers(fast_api)

    return fast_api


app = create_app()

if __name__ == '__main__':
    uvicorn.run(app, debug=True)
