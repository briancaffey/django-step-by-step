FROM python:3.11.8 AS base
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    POETRY_VERSION='1.8.0'

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG

RUN useradd --create-home --home-dir /code --shell /bin/bash app

WORKDIR /code
RUN pip install "poetry==$POETRY_VERSION"
COPY poetry.lock pyproject.toml /code/

FROM base AS prod
RUN curl https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -o /usr/local/share/global-bundle.pem
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --only main
COPY . /code
RUN chown -R app:app /code
USER app

FROM base AS local
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --with dev
USER app
