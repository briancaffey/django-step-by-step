.PHONY: all
all: migrate	runserver

.PHONY: pip-install
pip-install:
	pip install -r backend/requirements/base.txt
	pip install -r backend/requirements/test.txt
	pip install -r backend/requirements/dev.txt

.PHONY: source
source:
	. .local-env/bin/activate

.PHONY: migrate
migrate:
	# migrate
	backend/manage.py migrate

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