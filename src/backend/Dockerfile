FROM python:3.10-slim-bullseye

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY ./text_to_image /src/text_to_image
COPY ./web /src/web

CMD ["uvicorn", "web.main:app", "--host", "0.0.0.0", "--port", "80"]
