FROM --platform=linux/amd64 python:3.8
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt
ADD . /code/
RUN useradd -m app
USER app