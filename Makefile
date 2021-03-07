.PHONY: all
all: migrate	runserver

.PHONY: pip-install
pip-install:
	pip install -r backend/requirements/base.txt
	pip install -r backend/requirements/test.txt
	pip install -r backend/requirements/dev.txt

.PHONY: create-venv
create-venv:
	python3 -m venv .local-env

.PHONY: source
source:
	. .local-env/bin/activate

.PHONY: migrate
migrate:
	# migrate
	backend/manage.py migrate

.PHONY: createsuperuser
createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com backend/manage.py createsuperuser --no-input


.PHONY: runserver
runserver:
	# runserver
	backend/manage.py runserver_plus

.PHONY: pip-local
pip-local:
	# install pip dependencies locally in virtual env
	python3 -m pip install --upgrade pip
	pip install -r backend/requirements/base.txt
	pip install -r backend/requirements/dev.txt
	pip install -r backend/requirements/test.txt

.PHONY: pytest
pytest:
	# Running Django test suite
	pytest backend

.PHONY: notebook
notebook:
	backend/manage.py shell_plus --notebook

.PHONY: flake8
flake8:
	flake8 backend

.PHONY: black
black:
	black -l 79 backend

.PHONY: format
format: flake8	black

.PHONY: pg_isready
pg_isready:
	pg_isready

.PHONY: redis-cli-ping
redis-cli-ping:
	redis-cli ping

.PHONY: start-celery-default-worker
start-celery-default-worker:
	DJANGO_SETTINGS_MODULE=backend.settings.development watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO


flower:
	DJANGO_SETTINGS_MODULE=backend.settings.development celery flower -A backend.celery_app:app --address=127.0.0.1 --port=5555
