.PHONY: all
all: migrate	runserver

.PHONY: migrate
migrate:
	# migrate
	backend/manage.py migrate

.PHONY: runserver
runserver:
	# runserver
	backend/manage.py runserver

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
