# Makefile - common commands for development. Run `make help` to print target details

.PHONY: all	pip-install	create-venv	source	migrate	createsuperuser	runserver	pip-local	pytest	notebook
.PHONY: flake8	black	format	pg_isready	celery-default-worker	redis-cli-ping	openapi	show_urls cypress
.PHONY: psql	schema	sdl

.PHONY: check-poetry	poetry-export	poetry-update	poetry-install	poetry-update
.PHONY:	poetry-pytest	poetry-pytest-cov	poetry-celery-default-worker
.PHONY: htmlcov

all: migrate	runserver

## -- System Check Targets --
check:
	@docker --version
	@which python3
	@python3 --version
	@echo Node `node -v`; echo

# check to see if postgres and redis are running locally
check_dbs: pg_isready	redis-cli-ping

## -- Poetry Targets --

## Check poetry installation
poetry-version:
	poetry --version

poetry-python-version:
	cd backend && poetry run python3 --version && poetry run python --version

poetry-which-python:
	cd backend && poetry run which python && poetry run which python3

poetry-lock:
	cd backend && poetry lock

## Export requirements from poetry to requirements.txt and requirements_dev.txt
poetry-export: poetry-export-base	poetry-export-dev

poetry-export-base:
	cd backend && poetry export --without-hashes -f requirements.txt -o requirements.txt

poetry-export-dev:
	cd backend && poetry export --with dev --without-hashes -f requirements.txt -o requirements_dev.txt

## Install dependencies
poetry-install:
	cd backend && poetry install

## Update dependencies
poetry-update:
	cd backend && poetry update

## Migrate using poetry's virtual environment
poetry-makemigrations:
	cd backend && poetry run python3 manage.py makemigrations

## Migrate using poetry's virtual environment
poetry-migrate:
	cd backend && poetry run python3 manage.py migrate

## Create superuser using poetry environment
poetry-createsuperuser:
	cd backend && poetry run python3 manage.py createsuperuser --no-input --email user5@email.com

## Start local development server using poetry virtual environment
poetry-runserver:
	cd backend && poetry run python3 manage.py runserver

## As an alternative to the above runserver command, use runserver_plus from django-extensions which uses Werkzeug
poetry-runserver-plus:
	cd backend && poetry run python3 manage.py runserver_plus

## start the celery default worker
poetry-celery-default-worker:
	cd backend && poetry run python3 manage.py start_celery_worker

## start celery beat
poetry-celery-beat:
	cd backend && poetry run python3 manage.py start_celery_beat

## start a jupyter notebook session
poetry-notebook:
	cd backend && poetry run python3 manage.py shell_plus --notebook

## open a Django shell with shell_plus from django-extensions
poetry-shell:
	cd backend && poetry run python3 manage.py shell_plus

## Run pytest using poetry virtual environment
poetry-pytest:
	cd backend && poetry run pytest

## Show URLs using poetry virtual environment
poetry-show-urls:
	cd backend && poetry run python3 manage.py show_urls

## Generate GraphQL schema as JSON using poetry schema
poetry-make-schema:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.json

## Generate GraphQL schema as SDL using poetry environment
poetry-make-sdl:
	cd backend && python3 manage.py graphql_schema --schema backend.schema.schema --out schema.graphql

## Generate OpenAPI schema using poetry environment
poetry-make-openapi-schema:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Run pytest with a code coverage report using poetry virtual environment
poetry-pytest-cov:
	cd backend && poetry run pytest --cov-report html --cov=backend

## check code formatting with flake8
poetry-flake8:
	cd backend && poetry run flake8

## check code formatting with black
poetry-black:
	cd backend && poetry run black .

## run flake8 and black
poetry-format: poetry-flake8	poetry-black

## Generate data for post model
poetry-generate-posts:
	cd backend && poetry run python3 manage.py generate_posts

## Generate graphviz diagram of database tables
poetry-graphviz-models:
	cd backend && poetry run python3 manage.py graph_models -a -o models.png

## -- Virtual Environment Targets --

# remove the virtualenv in backend/.env
venv-clean:
	@rm -rf backend/.env

# installs dependencies
venv-install-dev: venv-clean
	@python3 -m venv backend/.env
	@python3 -m pip install --upgrade pip
	@. backend/.env/bin/activate
	@pip3 install -r backend/requirements_dev.txt

venv-activate:
	@. backend/.env/bin/activate

## Apply migration files to the database
venv-migrate:
	backend/manage.py migrate

## Make database migration files
venv-make-migrations:
	backend/manage.py makemigrations

## Create a super user to access the Django admin locally
venv-createsuperuser:
	DJANGO_SUPERUSER_PASSWORD=password DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=user@email.com backend/manage.py createsuperuser --no-input

# Start the Django application locally using runserver_plus and Werkzeug
venv-runserver:
	backend/manage.py runserver_plus

## Start nginx so that the backend API and frontend dev server can both be accessed on localhost:80
venv-nginx:
	sudo nginx -c $$(pwd)/nginx/dev/local.conf

## stop nginx
venv-nginx-stop:
	sudo nginx -s stop

## Install python dependencies in a local virtual environment (.local-env)
venv-pip-install:
	pip3 install -r backend/requirements_dev.txt

## Run pytest
venv-pytest:
	pytest backend

## Run pytest and generate a code coverage report
venv-pytest-cov:
	pytest backend --cov-report html --cov=backend

## -- Coverage Targets --
## HTTP server for viewing python code coverage results
htmlcov:
	python3 -m http.server 8002 -d backend/htmlcov

## Open a jupyter notebook session
venv-notebook:
	backend/manage.py shell_plus --notebook

## Lint python code using flake8
venv-flake8:
	flake8 backend

## Format code using black
venv-black:
	black -l 79 backend

## Formate code using flake8 and black
venv-format: venv-flake8	venv-black

## Start celery worker that will reload on code changes
venv-celery-default-worker:
	cd backend && python3 manage.py start_celery_worker

## Start celery beat that will reload on code changes
venv-celery-beat:
	cd backend && python3 manage.py start_celery_beat

## Start flower for debugging and monitoring celery tasks and workers
venv-flower:
	cd backend && celery -A backend.celery_app:app flower --address=127.0.0.1 --port=5555

## Generate posts
venv-generate-posts:
	backend/manage.py generate_posts

## Delete database
venv-flush:
	backend/manage.py flush

## Generate OpenAPI schema
venv-openapi:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Show all URLs
venv-show_urls:
	python3 backend/manage.py show_urls

# output graphql schema as JSON
venv-make-gql-schema-json:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.json

## output graphql schema as SDL
venv-make-gql-schema-sdl:
	python3 backend/manage.py graphql_schema --schema backend.schema.schema --out schema.graphql

## output graphviz diagram of database table relationships
venv-graphviz-models:
	python3 backend/manage.py graph_models -o my_project_subsystem.png

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
docker-compose-up:
	@docker compose up

## run pytest-cov with backend container
docker-compose-pytest-cov:
	docker compose run backend pytest --cov-report html --cov=.

docker-compose-generate-openapi-schema:
	docker exec backend python manage.py generateschema > backend/static/openapi/schema.yml

## update poetry through docker - this updates the lock file
docker-compose-poetry-update:
	docker compose run backend poetry update

## export poetry dependencies from poetry.lock file to requirements.txt and requirements_dev.txt
docker-compose-poetry-export: docker-compose-poetry-update
	docker compose run backend poetry export --without-hashes -f requirements.txt -o requirements.txt && docker compose run backend poetry export --without-hashes -f requirements.txt -o requirements_dev.txt --dev

## create a superuser in the docker compose development environment (credentials are: admin@email.com/password)
docker-compose-createsuperuser:
	docker compose run -e DJANGO_SUPERUSER_PASSWORD=password backend python manage.py createsuperuser --email admin@email.com --no-input

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

## install and run redis-commander on port 8085
redis-commander:
	npm install -g redis-commander
	redis-commander -p 8085

## -- Cypress Targets --

## install cypress dependencies
cypress_install:
	cd cypress && npm install cypress --save-dev

## Open Cypress. Note: this command does not work on WSL
cypress_open:
	cd cypress && npx cypress open

## Open a psql shell
psql:
	sudo -u postgres psql

## -- Quasar Targets --

quasar-install:
	cd quasar-app && yarn

## start quasar project locally
quasar-dev:
	cd quasar-app && quasar dev

## build quasar project in SPA mode
quasar-build:
	cd quasar-app && quasar build -m spa

## -- VuePress Targets --

## start vuepress documentation site locally
vuepress-dev:
	cd vuepress-docs && yarn docs:dev

vuepress-build:
	cd vuepress-docs && yarn docs:build

## -- K6 Targets --
k6-local-run-docker:
	@docker run --rm --net=host -i grafana/k6 run - <k6/script.js

## -- Terraform Targets --

## Format terraform files
tf-fmt:
	cd iac/terraform && terraform fmt -recursive

## initialize terraform for the backend
tf-bootstrap-init:
	cd iac/terraform/bootstrap && terraform init --var-file=bootstrap.tfvars

## initialize terraform for the backend
tf-bootstrap-init-upgrade:
	cd iac/terraform/bootstrap && terraform init -upgrade --var-file=bootstrap.tfvars

## plan terraform S3 backend configuration
tf-bootstrap-plan:
	cd iac/terraform/bootstrap && terraform plan --var-file=bootstrap.tfvars

## apply terraform S3 backend configuration
tf-bootstrap-apply:
	cd iac/terraform/bootstrap && terraform apply --var-file=bootstrap.tfvars

## init, plan and apply terraform backend configuration
tf-bootstrap:	tf-bootstrap-init	tf-bootstrap-plan	tf-bootstrap-apply

## destroy terraform backend and ecr resources
tf-bootstrap-destroy:
	cd iac/terraform/bootstrap && terraform destroy --var-file=bootstrap.tfvars

## -- CDK Targets --
projen:
	@cd iac/cdk && npx projen

## -- AWS Targets --

## start ecs exec session in a container in application environment
aws-ecs-exec:
	@./backend/scripts/aws/ecs_exec.sh

## connects a shell to the bastion host in a base environment
aws-ssm-start-session:
	@./backend/scripts/aws/ssm_start_session.sh

## start port forwarding session for ad hoc env
aws-ssm-port-forward:
	@./backend/scripts/aws/ssm_port_forward.sh

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
