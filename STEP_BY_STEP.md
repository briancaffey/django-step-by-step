# Django Step by Step

## Start with a blank git repo and create two files: `README.md` and `STEP_BY_STEP.md`:

```
touch README.md STEP_BY_STEP.md
```

`README.md` will be a brief introduction to the project followed by simple instructions for setting up the project locally. `STEP_BY_STEP.md` will include our step-by-step instructions for building this project.

This file will document our project setup, step by step.

## Create a virtual environment

```
python3 -m venv .local-env
```

## Activate the virtual environment

```
source .local-env/bin/activate
```

## Make sure pip is upgraded to the latest version

```
python3 -m pip install --upgrade pip
```

## Install Django

```
pip install Django==3.1.5
```

Install the latest version of Django. You may also want to install the LTS version. See https://www.djangoproject.com/download/ for more information about Django's long term support releases.

## Start a new Django project

```
django-admin startproject backend
```

This creates a project with the following structure:

```
$ tree -L 2 backend

backend
├── backend
│   ├── asgi.py
│   ├── __init__.py
│   ├── __pycache__
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
└── manage.py
```

Note that there are two "backend" folders. I'll refer to these as either `backend/` or `backend/backend/` for the nested `backend` folder that contains `settings.py`

## Add a `.gitignore` file to the `backend` directory

Here's a good `.gitignore` file for Python/Django applications:

[https://www.toptal.com/developers/gitignore/api/python,django](https://www.toptal.com/developers/gitignore/api/python,django)

```
wget -O backend/.gitignore https://www.toptal.com/developers/gitignore/api/python,django
```

## Add a `.gitignore` file to the root of the project

Add another `.gitignore file, but this time to the root of the project:

```
echo ".env" > .gitignore
```

## migrate and runserver

Let's start our Django project to make sure that everything is working properly:

```
./backend/manage.py migrate && ./backend/manage.py runserver
```

```
./backend/manage.py migrate && ./backend/manage.py runserver
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
February 01, 2021 - 00:00:00
Django version 3.1.5, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

You should see the rocketship animation with the message:

> The install worked successfully! Congratulations!

Note that a file called `db.sqlite3` was created in `backend/`. Django uses a default SQLite file-based database for simplicity. We will use Postgres instead of sqlite3, but we will make this change later. For our purposes, SQLite and Postgres function similarly in our local development environment.

## `settings.py` file change: `SECRET_KEY`

By default, Django includes an automatically-generated, hard-coded sensitive value in our settings file called `SECRET_KEY`.

Open `backend/backend/settings.py` and change `SECRET_KEY` to the following:

```py
SECRET_KEY = os.environ.get("SECRET_KEY", "my-secret-key")
```

also, add the following line to the top of the same file:

```py
import os
```

This tells our settings file to use the environment variable called `SECRET_KEY` as the value for the Django settings called `SECRET_KEY`. If there is no environment variable called `SECRET_KEY`, the value of `my-secret-key` will be used as a fallback. At this point we haven't set any environment variables yet, so the value of `my-secret-key` will be used in our local development environment. Using a fallback value for the `SECRET_KEY` setting is probably not a good idea. If we forget to set a secure `SECRET_KEY` value in our production environment, we don't want to use a non-secure `SECRET_KEY` value like `my-secret-key`, so we will remove the default setting and set the `SECRET_KEY` value explicitly in both the local and production environments.

## `settings.py` file change: `DEBUG`

We also don't want to hard-code the `DEBUG` setting, so this setting value can be changed to:

```py
DEBUG = bool(int(os.environ.get("DEBUG", "1")))
```

This uses a `True` default value for `DEBUG` if the `DEBUG` environment variable is not set.

## Move `backend/backend/settings.py` to `backend/backend/settings/base.py` and add `backend/backend/settings/**init**.py

```
mkdir backend/backend/settings && touch backend/backend/settings/__init__.py && mv backend/backend/settings.py backend/backend/settings/base.py
```

If we try to restart the server, we will see that it doesn't work:

```
django.core.exceptions.ImproperlyConfigured: The SECRET_KEY setting must not be empty.
```

## Change the value of `BASE_DIR`

```py
BASE_DIR = Path(__file__).resolve().parent.parent.parent
```

We need to add another `.parent` since the settings module used is now one layer deeper

## Create `backend/backend/settings/development.py`

The `base.py` settings module will be used for defining settings that are common to both the development and production environment. We will define development-specific settings in another file that will inherit values from `base.py`. Create this file:

```
echo "from .base import *  # noqa" >> backend/backend/settings/development.py
```

## Change `DJANGO_SETTINGS_MODULE` in `backend/manage.py` again

Now change the default `DJANGO_SETTINGS_MODULE` value to `backend.settings.development`:

```py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.development')
```

## Add a requirements folder with three files: `base.txt`, `dev.txt` and `test.txt`

```
mkdir backend/requirements && touch backned/requirements/{base,dev,test}.txt
```

In `base.txt`, add the only dependency that we have so far, which is Django:

```
echo "Django==3.1.5" >> backend/requirements/base.txt
```

`base.txt`:

```
Django==3.1.5
```

We will add new requirements to these three development files as we build out our project.

The new project directory structure looks like this:

```
$ tree -L 3 backend/
backend/
├── backend
│   ├── asgi.py
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-38.pyc
│   │   ├── settings.cpython-38.pyc
│   │   ├── urls.cpython-38.pyc
│   │   └── wsgi.cpython-38.pyc
│   ├── settings
│   │   ├── base.py
│   │   ├── development.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── requirements
    ├── base.txt
    ├── dev.txt
    └── test.txt
```

## Install Django Debug Toolbar

Django Debug Toolbar is a great tool for debugging several different aspects of Django, including ORM optimizations, caching, etc.

The installation instructions from [here](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) are pretty straightforward. Instead of running `python -m pip install django-debug-toolbar`, we can add that dependency directly to our project's `requirements/dev.txt` file since the Django Debug Toolbar should only be used in local development.

```
echo "django-debug-toolbar==3.2" >> backend/requirements/dev.txt
```

Next, install the dependencies:

```
pip install -r backend/requirements/dev.txt
```

Next there are some Django settings to change. Similar to how we only want the Debug Toolbar installed in our project dependencies for our local development environment, the settings to enable the debug toolbar should only be used in the development environment. This is exactly what the `backend/backend/settings/development.py` file is for. We will make the following changes in the `development.py` settings file:

- Add `'debug_toolbar',` to `INSTALLED_APPS`
- Add Debug Toolbar to URLconf
- Add Debug Toolbar to middleware

## Add `debug_toolbar` to `INSTALLED_APPS`

```py
# backend/backend/settings/development.py
INSTALLED_APPS += ['debug_toolbar']
```

## Add URLconf for debug toolbar

```py
import debug_toolbar
from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('my-admin-portal/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
```

## Add debug toolbar to middleware

```py
# backend/backend/settings/development.py
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

## Set `INTERNAL_IPS` for debug toolbar

From the Django Debug Toolbar docs:

> The Debug Toolbar is shown only if your IP address is listed in the `INTERNAL_IPS` setting.

```py
# backend/backend/settings/development.py
INTERNAL_IPS = ['127.0.0.1']
```

## Create a superuser with `createsuperuser`

At this point we have a very basic Django application. Django projects are created with a fully-featured admin. The admin is an interface where you can easily create, read, update and delete items from your database. We can view the admin by visiting `http://127.0.0.1:8000/admin`. This should prompt us for a username and password. We have to create this with the `createsuperuser` management command:

```
DJANGO_SUPERUSER_PASSWORD=Qazwsx1! DJANGO_SUPERUSER_USERNAME=brian DJANGO_SUPERUSER_EMAIL=brian@email.com backend/manage.py createsuperuser --no-input
Superuser created successfully.
```

This command will create the necessary environment variables for the username, email and password for the superuser and create that user without prompting you to type these in the terminal. Try logging in with these credentials to make sure that everything works.

## Rename the `/admin` URL

To prevent bots from trying to login to our admin, it is a good idea change the default URL path that Django sets for the Django admin. Let's change `admin/` to `my-admin-portal/`:

`backend/backend/urls.py` should now look like this

```py
urlpatterns = [
    path('my-admin-portal/', admin.site.urls),
]
```

## Setup a Django app called `core`

Next we will add the first app to this Django project. Apps are Django's way of encapsulating logic. My Django projects typically have three apps: `core`, `accounts` and some other app that contains the majority of my project's logic.

I use the `core` app for models, views, middleware and other logic that isn't directly related to our application's logic. For example, a view that is used for application health checks, a model that is used for logging all requests, and a middleware used to save a record in our database for each request. We will implement these later, but for now let's just add the `core` app:

```
mkdir -p backend/apps/core && django-admin startapp core ./backend/apps/core
```

The `core` app is created in a folder called `apps` in the top-level `backend/` directory.

When we add this app to `INSTALLED_APPS` in our `base.py` settings file, we need to add it like this:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'apps.core'
]
```

## Setup a Django app called `accounts`

```
mkdir -p backend/apps/accounts && django-admin startapp accounts ./backend/apps/accounts
```

Add `'apps.accounts'` to `INSTALLED_APPS` in `base.py`

## Setup a Custom User Model

Reference: [https://testdriven.io/blog/django-custom-user-model/](https://testdriven.io/blog/django-custom-user-model/)

I have been using the steps described in this article in my recent Django projects for setting up a custom user model. This is a comprehensive guide that covers:

- Tests
- ModelManager
- Model
- Forms
- Admin
- Settings

Setting a custom user model is important to do early in the development of your project (if it is something your project requires)

We can start by creating the custom user model:

```py
# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
```

## Set `AUTH_USER_MODEL = 'accounts.CustomUser'` in `base.py` settings

```py
AUTH_USER_MODEL = 'accounts.CustomUser'
```

**Note**: we don't set `AUTH_USER_MODEL` to `apps.accounts.CustomUser`

We can't run `makemigrations` just yet, we need to add the `CustomUserManager` for the `CustomUser` model.

## Add `CustomUserManager` for `CustomUser` model

```py
# apps/accounts/managers.py
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

```

## Add admin settings and forms for CustomUser

## Add tests for the `CustomUser` model

```py
# apps/accounts/tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)
```

## Run `makemigrations` and `migrate` management command

```
./backend/manage.py makemigrations
```

```
$ ./backend/manage.py makemigrations
Migrations for 'accounts':
  backend/apps/accounts/migrations/0001_initial.py
    - Create model CustomUser
```

When we try to run `migrate`, there will be an error:

```
django.db.migrations.exceptions.InconsistentMigrationHistory: Migration admin.0001_initial is applied before its dependency accounts.0001_initial on database 'default'.
```

At this point, we can remove the `db.sqlite3` file and rerun the migrate command.

```
rm backend/db.sqlite3 && ./backend/manage.py migrate
```

## Run the tests

```
$ ./backend/manage.py test backend/apps/accounts
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..
----------------------------------------------------------------------
Ran 2 tests in 0.246s

OK
Destroying test database for alias 'default'...
```

Running `./manage.py test` from the root of the project won't work, so you need to either cd to the directory or run the command specifying the app or apps you want to test. We can add this to an alias or a `make` command like this:

```yml
# Makefile
.PHONY: pytest
pytest:
	# Running Django test suite
	backend/manage.py test backend/apps
```

## Install pytest

```
echo "pytest==6.2.2" >> backend/backend/settings/test.txt
```

Since this dependency will be used only in testing, we can add it to the `test.txt` file. Next, install the requirements listed in this file (pytest) so we can use the `pytest` command at the command line.

We will also use the `pytest-django` plugin:

```
echo "pytest-django 4.1.0" >> backend/backend/settings/test.txt
```

Now install these dependencies with:

```
pip install -r backend/requirements/test.txt
```

Running pytest from our project root will make it impossible for `pytest` to find any tests. Additional configuration for pytest needs to be added so that pytest can find and run tests.

## Add `pytest.ini` to configure `pytest`

Add the following file called `pytest.ini` to the root of the top-level `backend` directory:

```ini
[pytest]
DJANGO_SETTINGS_MODULE = backend.settings.development
python_files = tests.py test_*.py *_tests.py
```

With setting we can invoke `pytest` by running:

```
pytest backend
```

in the root of our project directory. If running from the backend folder, you can simply invoke `pytest` with:

```
pytest
```

## Add pytest command to Makefile

Let's add this as a `make` command by adding the following to our `Makefile`:

```Makefile
.PHONY: pytest
pytest:
	# Running pytest tests
	pytest backend
```

## Setup code coverage reports

```
# backend/requirements/test.txt

pytest-cov==2.11.1
```

Reinstall this file with `pip install -r backend/requirements/test.txt` and run:

```
pytest backend --cov=backend
```

This will give a coverage report:

```
----------- coverage: platform linux, python 3.8.7-final-0 -----------
Name                                               Stmts   Miss  Cover
----------------------------------------------------------------------
backend/__init__.py                                    0      0   100%
backend/apps/accounts/__init__.py                      0      0   100%
backend/apps/accounts/admin.py                         1      0   100%
backend/apps/accounts/managers.py                     20      1    95%
backend/apps/accounts/migrations/0001_initial.py       6      0   100%
backend/apps/accounts/migrations/__init__.py           0      0   100%
backend/apps/accounts/models.py                       12      1    92%
backend/apps/accounts/tests.py                        33      4    88%
backend/apps/core/__init__.py                          0      0   100%
backend/apps/core/admin.py                             1      0   100%
backend/apps/core/migrations/__init__.py               0      0   100%
backend/apps/core/models.py                            1      0   100%
backend/apps/core/tests.py                             1      0   100%
backend/backend/__init__.py                            0      0   100%
backend/backend/asgi.py                                4      4     0%
backend/backend/settings/__init__.py                   0      0   100%
backend/backend/settings/base.py                      20      0   100%
backend/backend/settings/development.py                4      0   100%
backend/backend/urls.py                                7      7     0%
backend/backend/wsgi.py                                4      4     0%
backend/manage.py                                     12     12     0%
----------------------------------------------------------------------
TOTAL                                                126     33    74%
```

## Write browsable coverage to a directory and view with simple HTTP server

Run pyest with the following options:

```
pytest backend --cov=backend --cov-report html:backend/.coverage
```

Then run a simple local file server

```
python -m http.server 8002 --directory backend/.coverage
```

[http://localhost:8002](http://localhost:8002) will open the code coverage report.

`.coverage` is already included in the `.gitignore` file that was included originally, so generating the coverage report at this location will not add anything to git.

More options for pytest-cov can be found here: [https://pytest-cov.readthedocs.io/en/latest/reporting.html](https://pytest-cov.readthedocs.io/en/latest/reporting.html)

## Configure VSCode settings

In order to do linting with `flake8` and formatting with `black`, VSCode needs some special settings:

Here's my VSCode configuration:

```json
{
  "python.pythonPath": ".local-env/bin/python",
  "python.linting.flake8Enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.enabled": true,
  "editor.formatOnSave": true,
  "python.formatting.provider": "black",
  "python.formatting.blackPath": ".local-env/bin/black",
  // flake8 has a default line-length of 79, so we use that for black as well
  "python.formatting.blackArgs": ["--line-length", "79"]
}
```

These settings will automatically format Python code and do code linting to indicate errors that need fixing. `black` has a default line-length of 88 columns. Thi is the one setting to change in the `black` command line arguments in the VSCode project settings.

## Python code linting with flake8

We will use flake8 in our python code tests together with `pytest`. Add the flake8 dependency to the `test.txt` requirements file:

```
flake8==3.8.4
```

```
flake8 backend
```

This shows lots of errors:

```
$ flake8 backend
backend/manage.py:9:80: E501 line too long (83 > 79 characters)
backend/apps/accounts/views.py:1:1: F401 'django.shortcuts.render' imported but unused
backend/apps/accounts/admin.py:1:1: F401 'django.contrib.admin' imported but unused
backend/apps/accounts/tests.py:9:80: E501 line too long (80 > 79 characters)

...
```

Instead of manually going over each of these files and making the required formatting changes, we can install `black` as a way to automatically format all of the python code at once. `black` should be able to format most of the `E501 line too long` errors.

## Format python code with black

First, install black by adding it to test dependencies (`test.txt`):

```
black==20.8b1
```

Then run:

```
black backend
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/accounts/apps.py
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/core/apps.py
reformatted /home/brian/gitlab/django-step-by-step/backend/backend/settings/development.py
reformatted /home/brian/gitlab/django-step-by-step/backend/backend/asgi.py
reformatted /home/brian/gitlab/django-step-by-step/backend/backend/wsgi.py
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/accounts/models.py
reformatted /home/brian/gitlab/django-step-by-step/backend/backend/urls.py
reformatted /home/brian/gitlab/django-step-by-step/backend/manage.py
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/accounts/managers.py
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/accounts/tests.py
reformatted /home/brian/gitlab/django-step-by-step/backend/backend/settings/base.py
reformatted /home/brian/gitlab/django-step-by-step/backend/apps/accounts/migrations/0001_initial.py
All done! ✨ 🍰 ✨
12 files reformatted, 13 files left unchanged.
```

Now run `flake8 backend` to see how many errors there are:

```

```

## Add runserver_plus and Werkzeug

Install dependencies for `runserver_plus` and `Werkzeug`:

```
django-extensions==3.1.0
Werkzeug==1.0.1 # used for runserver_plus exception console
```

Add the `django-extensions` app to `INSTALLED_APPS`:

```py
    'django_extensions',
```

`runserver_plus`

## Add a base model for tracking created/modified timestamps

Adding a base model can be useful for adding fields to models that will be included on most of the other models in our project.

Here's an example of a base model we can use in our project. This model will be added to our `core` Django app and is a typical example of why it helps to have a `core` or `common` app that can help to organize things that aren't specific to one app.

```py
from django.conf import settings
from django.db import models


class BaseModel(models.Model):

    created_on = models.DateTimeField(auto_now_add=True, editable=False)
    modified_on = models.DateTimeField(auto_now=True, editable=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        default=None,
        blank=True,
        editable=False,
        on_delete=models.SET_NULL,
        related_name='%(app_label)s_%(class)s_created_by',
    )
    modified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        default=None,
        blank=True,
        editable=False,
        on_delete=models.SET_NULL,
        related_name='%(app_label)s_%(class)s_modified_by',
    )

    class Meta:
        abstract = True
```

There's no need to run migrations since the model is `abstract`. This model can now be subclassed when making new models. This will be used shortly.

## Add settings for enabling use of Jupyter notebooks

Add the following dependencies that will allow us to use Jupyter notebooks to work with our Django application in it's own environment.

`dev.txt`

```
# for Jupyter notebooks
ipython==7.20.0
jupyter==1.0.0
```

Add the following make command:

```
PHONY: notebook
notebook:
	backend/manage.py shell_plus --notebook
```

Running `make notebook` (or `backend/manage.py shell_plus --notebook`) will open up a Jupyter notebook in the browser. Click on `New` > `Django Shell-Plus` and you can run `!pip freeze` to view the dependencies installed to confirm that the environment is correct.

In order to make ORM queries, the following must be ran in the notebook:

```python
%env DJANGO_ALLOW_ASYNC_UNSAFE=true
```

This will set the environment variable `DJANGO_ALLOW_ASYNC_UNSAFE` which we will allow for the execution database queries through the ORM, for example:

```py
%env DJANGO_ALLOW_ASYNC_UNSAFE=true
from django.contrib.auth import get_user_model
User = get_user_model()
users = User.objects.all()
users.count()
```

The `DJANGO_ALLOW_ASYNC_UNSAFE` environment variable can also be set in your shell before launching Jupyter notebook.

## Setup Postgres locally

Run the following command to ensure that Postgres is install and running:

```
sudo service postgresql status
```

```
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; disabled; vendor preset: enabled)
   Active: active (exited) since Mon 2021-02-01 19:41:34 EST; 2min 49s ago
  Process: 5543 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 5543 (code=exited, status=0/SUCCESS)

Feb 01 19:41:34 x1 systemd[1]: Starting PostgreSQL RDBMS...
Feb 01 19:41:34 x1 systemd[1]: Started PostgreSQL RDBMS.
```

Ubuntu 20.04 shows the following:

```
sudo service postgresql start
```

```
sudo service postgresql status
12/main (port 5432): online
```

## Configure our Django application to use our local postgres service

The Postgres service is available at `localhost:5432`.

```
sudo -u postgres psql postgres
ALTER USER postgres WITH PASSWORD 'postgres';
```

Add `psycopg2` to our project dependencies (in `base.txt`):

```
psycopg2-binary==2.8.6
```

Add the following settings to `base.py`:

```py
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_NAME", "postgres"),
        "USER": os.environ.get("POSTGRES_USERNAME", "postgres"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "postgres"),
        "HOST": os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_SERVICE_PORT", 5432),
    }
}
```

Now run the `migrate` management command and then `runserver` (or just run `make` to run the migrate command and start the development server).

## Another approach to running postgres on our machine and an introduction to docker: run postgres in a docker container

Reference: [https://hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)

```
docker run -d \
    --name some-postgres \
    -p 5434:5432
    -e POSTGRES_PASSWORD=mysecretpassword \
    -v /tmp/pgdata:/var/lib/postgresql/data \
    postgres
```

You can access the psql shell with the following command:

```
docker exec -it some-postgres sh
```

```
# psql -U postgres
psql (12.1 (Debian 12.1-1.pgdg100+1))
Type "help" for help.

postgres=#
```

## Improve the readability of the command by using docker-compose

```yml
version: "2.4"

services:
  postgres:
    container_name: postgres
    image: postgres
    networks:
      - main
    ports:
      - "5434:5432"
    volumes:
      - pg-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres

volumes:
  pg-data:

networks:
  main:
    driver: bridge
```

We can use docker and docker-compose for "dockerizing" our application as much or as little as we want. Eventually I'll show how to fully dockerize all components of our application. This will simplify the process of starting the entire project locally and will also ensure that developers don't have any issues with running the application properly.

## Setup pgadmin4 locally

Add `pgadmin4` to `dev.txt` and install the local dependencies (**`make pip-local`**).

If you see errors about log file permissions, run the following:

```
sudo mkdir /var/log/pgadmin
sudo chown -R $USER:$USER /var/log/pgadmin
```

Run `pgadmin4` in a terminal with the virtual environment activated, then enter an email and password that you will use to login for the first time. Login to the program when it opens in the browser, enter your email and password and create a new server. User `postgres` for the name, user and password.

## Setup pgadmin4 in docker-compose

## Add a Dockerfile for our Django application

Now that the main dependency for our project (postgres) is running in docker, it is important to decide if the Django application itself should run as a containerized process in our local development environment. For most Django projects, either way is probably fine. If we don't use docker for running the Django application, then there is no problem with running it directly on the virtual environment as it has been running in up until now.

The main reasons why I choose to run project locally in docker are:

- it is easy to start everything at once with one command
- it is a standard format and makes it easy for people to start a complex project quickly without setting anything up
- it makes me more confident that something working correctly on my local docker environment will work on a remote server's docker environment as well.
- it will make deployment easier and more predictable

We need to do 2 things in order to start running our Django app in a container: write a Dockerfile and also provide some options for how to run the container.

First, we can start with this Dockerfile:

`backend/Dockerfile.dev`:

```Dockerfile
FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
RUN mkdir /code
WORKDIR /code
ADD requirements/base.txt \
    requirements/dev.txt \
    requirements/test.txt \
    /code/requirements/
RUN pip3 install -r requirements/base.txt
RUN pip3 install -r requirements/dev.txt
RUN pip3 install -r requirements/test.txt
ADD . /code/
RUN useradd -m app
USER app
```

Next, we need to think about how the container will run. Because there is no `EXEC` keyword in Dockerfile.dev, this Dockerfile doesn't tell the container what to do. Similar to how it was shown that postgres can be launched from the command line with command line arguments or from the `docker-compose` command that references a `docker-compose.yml` file, our containerized Django app can also be launched in these two ways.

Before we run the container, we need to build it. We can start with the `docker build` command:

```
docker build -t my-backend -f backend/Dockerfile.dev backend
```

You should see:

```
Successfully built 6aaa6b60ad17
Successfully tagged my-backend:latest
```

To run the container, use the following command:

```
docker run -p 8000:8000 my-backend
```

What about postgres? If we run:

```
docker run -p 8000:8000 my-backend python3 manage.py runserver
```

We will see the following error:

```
        Is the server running on host "localhost" (::1) and accepting
        TCP/IP connections on port 5432?
```

This is because the `localhost` on our browser is not the same as the `localhost` on our container.

To fix this, we need to run the docker container

```
docker run --network=host -p 8000:8000 my-backend python3 manage.py runserver_plus
```


## Add redis to docker-compose file for celery broker

## Setup redis-commander

## Add Django constance

## Setup Celery app, celery settings, debug tasks, watchdog commands

## Decide if you need `CELERY_TASKS_ALWAYS_EAGER` to be set to `True`

Depending on the type of celery tasks your app uses, you may or may not want to use a special Django setting that will run the task directly on the webserver and not on the worker. It can also be said that this setting runs the celery tasks synchronously when `CELERY_TASKS_ALWAYS_EAGER = True`. If your tasks involve simple steps like sending email or doing relatively fast processing, this might be fine.

If you want to simulate celery workers running in your local environment in a way similar that they would be running in production, you can also start different celery processes that can run one or more queues.

First it will be shown using the `CELERY_TASKS_ALWAYS_EAGER = True` setting, and second it will be shown how to use separate celery worker processes to simulate a production environment on a local development machine.

## Setup celery beat, settings, period task

## Setup mailhog for testing email locally

## Setup flower for celery monitoring

## Setup Django Channels (settings, routers, consumers, async tests)

## Setup git hooks in docker-compose

## Add Vue in Django templates

## Add Vue as standalone SPA (show how API calls will not work without CORS)

## Add CORS

## Add NGINX and remove CORS

## Add NGINX Dockerfile for local development

## Setup Vue in NGINX (web-sockets for hot reloading, index.html, etc)

## Add Django REST Framework

## Setup OpenAPI documentation

## Add Session Authentication for Vue SPA

## Use Nuxt for SSR

## Setup .gitlab-ci.yml

## Setup gitlab-runner

## Show how to setup e2e tests with Cypress

## Draw a project diagram using diagrams.net

## Generate model visualizations with graphviz

## Django Doctor

## VSCode remote container

---

Optional/Extra steps

## GraphQL (together with or replacing DRF/REST)

## Spatial and Geographic Databases (PostGIS)

## Portainer UI for viewing containers and logs
