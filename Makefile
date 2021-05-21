# Makefile - common commands for development. Run `make help` to print target details

.PHONY: all	pip-install	create-venv	source	migrate	createsuperuser	runserver	pip-local	pytest	notebook
.PHONY: flake8	black	format	pg_isready	celery-default-worker	redis-cli-ping	openapi	show_urls cypress
.PHONY: psql	schema	sdl

.PHONY: check-poetry	poetry-export	poetry-update	poetry-install	poetry-update
.PHONY:	poetry-pytest	poetry-pytest-cov	poetry-celery-default-worker

all: migrate	runserver

## -- Poetry Targets --

## Check poetry installation
check-poetry:
	poetry --version

## Export requirements from poetry to requirements.txt and requirements_dev.txt
poetry-export:
	cd backend && poetry export --without-hashes -f requirements.txt -o requirements.txt && poetry export --without-hashes -f requirements.txt -o requirements_dev.txt --dev

## Install dependencies
poetry-install:
	cd backend && poetry install

## Update dependencies
poetry-update:
	cd backend && poetry update

## Migrate using poetry's virtual environment
poetry-migrate:
	cd backend && poetry run python3 manage.py migrate

## Create superuser using poetry environment
poetry-createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com cd backend && poetry run python3 manage.py createsuperuser --no-input

## Start local development server using poetry virtual environment
poetry-runserver:
	cd backend && poetry run python3 manage.py runserver_plus

## Generate GraphQL schema as JSON using poetry schema
poetry-make-schema:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.json

## Generate GraphQL schema as SDL using poetry environment
poetry-make-sdl:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.graphql

## Generate OpenAPI schema using poetry environment
poetry-make-openapi-schema:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Show URLs using poetry virtual environment
poetry-show-urls:
	cd backend && poetry run python3 manage.py show_urls

## Run pytest using poetry virtual environment
poetry-pytest:
	cd backend && poetry run pytest

## Run pytest with a code coverage report using poetry virtual environment
poetry-pytest-cov:
	cd backend && poetry run pytest --cov-report html --cov=backend

poetry-celery-default-worker:
	cd backend && poetry run watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO

poetry-generate-posts:
	cd backend && poetry run python3 manage.py generate_posts

## -- Virtual Environment Targets --

## Apply migration files to the database
migrate:
	backend/manage.py migrate

## Make database migration files
migrations:
	backend/manage.py makemigrations

## Create a super user to access the Django admin locally
createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com backend/manage.py createsuperuser --no-input

# Start the Django application locally using runserver_plus and Werkzeug
runserver:
	backend/manage.py runserver_plus

## Install python dependencies in a local virtual environment (.local-env)
pip-local:
	pip3 install -r backend/requirements_dev.txt

## Run pytest
pytest:
	pytest backend

## Run pytest and generate a code coverage report
pytest-cov:
	pytest backend --cov-report html --cov=backend

## HTTP server for viewing python code coverage results
pytest-cov-report:
	python3 -m http.server 8002 -d htmlcov

## Open a jupyter notebook session
notebook:
	backend/manage.py shell_plus --notebook

## Lint python code using flake8
flake8:
	flake8 backend

## Format code using black
black:
	black -l 79 backend

## Formate code using flake8 and black
format: flake8	black

## Start celery worker that will reload on code changes
celery-default-worker:
	cd backend && watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO

## Start flower for debugging and monitoring celery tasks and workers
flower:
	cd backend && celery flower -A backend.celery_app:app --address=127.0.0.1 --port=5555

## Generate posts
generate-posts:
	backend/manage.py generate_posts

## Delete database
flush:
	backend/manage.py flush

## Generate OpenAPI schema
openapi:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Show all URLs
show_urls:
	python3 backend/manage.py show_urls

# output graphql schema as JSON and SDL
make-gql-schema-json:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.json

make-gql-schema-sdl:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.graphql


## -- microk8s Targets --

cdk8s_project_install:
	cd k8s/cdk8s && npm i

cdk8s_check_deps:
	npm list -g cdk8s-cli

cdk8s_synth: cdk8s_check_deps
	cd k8s/cdk8s && cdk8s synth

cdk8s_watch:
	cd k8s/cdk8s && npm run watch


## -- minikube Targets --

## start minikube
minikube_start: minikube_check_deps	minikube_build_and_push	minikube_synthesize_manifests	minikube_apply_manifests

## check dependencies needed for running minikube locally
minikube_check_deps:
	@k8s/scripts/check_deps.sh

## build and push images to minikube registry
minikube_build_and_push:
	@k8s/scripts/build_and_push.sh

## synthesized k8s manifests with cdk8s
minikube_synthesize_manifests:
	@k8s/scripts/synthesize_manifests.sh

## apply k8s synthesized manifests
minikube_apply_manifests:
	@k8s/scripts/apply_manifests.sh

## delete all k8s resources in minikube
minikube_destroy_resources:
	kubectl delete all --all -n app

## open a shell in the backend django container
minikube_backend_shell:
	@k8s/scripts/backend_shell.sh

## -- docker Targets --

## make migrations in backend container
docker-compose-backend-migrate:
	@docker compose run backend python3 manage.py migrate

## backend shell
docker-compose-backend-shell:
	@docker compose run backend python3 manage.py shell

## jupyter notebook
docker-compose-backend-jupyter:
	@docker compose run backend bash -c "cd notebooks && ../manage.py shell_plus --notebook"

## docker-compose up
docker-compose-up: docker-compose-backend-migrate
	@docker compose up

## -- Misc Targets --

## Check to see if the local postgres service is running
pg_isready:
	pg_isready

## Check to see if the local redis service is running
redis-cli-ping:
	redis-cli ping

## Run mailhog for debugging email operations
mailhog:
	~/go/bin/MailHog

## Open pgadmin4
pgadmin4:
	pgadmin4

## Open Cypress. Note: this command does not work on WSL
cypress:
	npx cypress open

## Open a psql shell
psql:
	sudo -u postgres psql

# Credit: https://gist.github.com/prwhite/8168133#gistcomment-2749866
## Show this help menu
help:
	@printf "Usage\n";

	@awk '{ \
			if ($$0 ~ /^.PHONY: [a-zA-Z\-\_0-9]+$$/) { \
				helpCommand = substr($$0, index($$0, ":") + 2); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^[a-zA-Z\-\_0-9.]+:/) { \
				helpCommand = substr($$0, 0, index($$0, ":")); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^##/) { \
				if (helpMessage) { \
					helpMessage = helpMessage"\n                     "substr($$0, 3); \
				} else { \
					helpMessage = substr($$0, 3); \
				} \
			} else { \
				if (helpMessage) { \
					print "\n                     "helpMessage"\n" \
				} \
				helpMessage = ""; \
			} \
		}' \
		$(MAKEFILE_LIST)
