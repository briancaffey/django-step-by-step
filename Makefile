# Makefile - common commands for development

.PHONY: all	pip-install	create-venv	source	migrate	createsuperuser	runserver	pip-local	pytest	notebook
.PHONY: flake8	black	format	pg_isready	celery-default-worker	redis-cli-ping	openapi	show_urls cypress

all: migrate	runserver


pip-install:
	pip install -r backend/requirements/base.txt
	pip install -r backend/requirements/test.txt
	pip install -r backend/requirements/dev.txt

create-venv:
	python3 -m venv .local-env

source:
	. .local-env/bin/activate

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

generate_posts:
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

cypress:
	npx cypress open