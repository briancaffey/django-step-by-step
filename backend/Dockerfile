FROM python:3.9.13 as base
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV POETRY_VERSION '1.2.0'

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG

RUN useradd --create-home --home-dir /code --shell /bin/bash app

WORKDIR /code
RUN pip install "poetry==$POETRY_VERSION"
COPY poetry.lock pyproject.toml /code/

FROM base AS prod
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --only main
COPY . /code
RUN chown -R app:app /code
USER app

FROM base AS local
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --with dev
USER app
