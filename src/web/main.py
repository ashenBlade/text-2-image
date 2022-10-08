import logging

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


def setup_middleware(fast_api: FastAPI) -> None:
    # if not fast_api.debug:
    #     raise RuntimeError("Need to configure CORS for production")

    fast_api.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


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
