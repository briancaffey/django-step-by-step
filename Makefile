# Makefile - common commands for development

.PHONY: all	pip-install	create-venv	source	migrate	createsuperuser	runserver	pip-local	pytest	notebook
.PHONY: flake8	black	format	pg_isready	celery-default-worker	redis-cli-ping	openapi	show_urls cypress
.PHONY: psql	schema	sdl

.PHONY: check-poetry	poetry-export	poetry-update	poetry-install	poetry-update
.PHONY:	poetry-pytest	poetry-pytest-cov	poetry-celery-default-worker

all: migrate	runserver

# Poetry commands
check-poetry:
	poetry --version

poetry-export:
	cd backend && poetry export --without-hashes -f requirements.txt -o requirements.txt && poetry export --without-hashes -f requirements.txt -o requirements_dev.txt --dev

poetry-install:
	cd backend && poetry install

poetry-update:
	cd backend && poetry update

poetry-migrate:
	# migrate
	cd backend && poetry run python3 manage.py migrate

poetry-createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com cd backend && poetry run python3 manage.py createsuperuser --no-input

poetry-runserver:
	cd backend && poetry run python3 manage.py runserver_plus

poetry-make-schema:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.json

poetry-make-sdl:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.graphql

poetry-make-openapi-schema:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

poetry-show-urls:
	cd backend && python3 manage.py show_urls

poetry-pytest:
	cd backend && poetry run pytest

poetry-pytest-cov:
	cd backend && poetry run pytest --cov-report html --cov=backend

poetry-celery-default-worker:
	cd backend && poetry run watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO

poetry-generate-posts:
	cd backend && poetry run python3 manage.py generate_posts


# the follow commands require a virtual environment to be activated
migrate:
	# migrate
	backend/manage.py migrate

migrations:
	backend/manage.py makemigrations

createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com backend/manage.py createsuperuser --no-input

runserver:
	# runserver
	backend/manage.py runserver_plus

pip-local:
	# install pip dependencies locally in virtual env
	python3 -m pip install --upgrade pip
	pip install -r backend/requirements/base.txt
	pip install -r backend/requirements/dev.txt
	pip install -r backend/requirements/test.txt

pytest:
	pytest backend

pytest-cov:
	pytest backend --cov-report html --cov=backend

pytest-cov-report:
	python3 -m http.server 8002 -d htmlcov

notebook:
	backend/manage.py shell_plus --notebook

flake8:
	flake8 backend

black:
	black -l 79 backend

format: flake8	black

pg_isready:
	pg_isready

redis-cli-ping:
	redis-cli ping

celery-default-worker:
	cd backend && watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO

flower:
	cd backend && celery flower -A backend.celery_app:app --address=127.0.0.1 --port=5555

generate-posts:
	backend/manage.py generate_posts

mailhog:
	~/go/bin/MailHog

pgadmin4:
	pgadmin4

flush:
	backend/manage.py flush

openapi:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

show_urls:
	python3 backend/manage.py show_urls

# this command does not work on WSL
cypress:
	npx cypress open

psql:
	sudo -u postgres psql

# output graphql schema as JSON and SDL
make-schema:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.json

make-sdl:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.graphql
