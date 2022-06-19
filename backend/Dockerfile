FROM python:3.9.9 as base
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG

RUN useradd --create-home --home-dir /code --shell /bin/bash app

WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt

FROM base AS local
ADD requirements_dev.txt /code/
RUN pip3 install -r requirements_dev.txt
USER app

FROM base AS prod

COPY . /code
RUN chown -R app:app /code
USER app
