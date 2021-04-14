# How I start Django projects in 2021 in 2\*\*8 simple steps

This document covers Django project setup step by step at a high level of detail. Starting from a blank directory, this guide will progressively build an application in a local development environment that uses Django as the core service. In addition to Django, there is a demonstration on how to use Vue.js along with Django in a "progressive" fashion. Vue is a personal choice, but it can be easily exchanged with any other frontend library or framework.

## What is a Django application?

Django application is an ambiguous term. There are three possible meanings that come to mind when someone says "Django application":

1. A web application built using the Django Web framework. Examples include YouTube, Pinterest, reddit, etc.
2. A reusable "plugin" that can installed in another Django application that a developer is creating.
3. A logical grouping of code in a Django application (these are typically called `apps`, and are created with the management command `startapp`)

This guide will focus on the first definition of "Django application". The application logic and data model will be very simple so that the guide can focus on showing how to build a productive Django development environment.

There are tools that generate Django projects with complete development environments, [cookiecutter-django](https://github.com/pydanny/cookiecutter-django) is a popular example. This guide is focusing on the order of each step and explaining how and why certain architectural decisions are made. This project will not provide a "production ready" template, but it will be developed in a way that will support multiple deployment scenarios such as containers and functions (such as AWS Lambda). This guide will cover continuous integration (automated acceptance testing)

Again, the goal of this project is to walk the reader through each step of setting up a Django project from scratch. Some of the topics include:

- How to setup your development environment on Windows (WSL 2) and Linux environment
- Popular tools used to help build Django applications (testing, debugging, etc.)
- Authentication and social authentication
- Different ways to incorporate Vue.js and which one you should choose for your next project if you intend on using Vue.
- How docker can be used in a Django application development workflow and reasons you might want to use docker

Writing this is not easy. There are lots of decisions to make regarding what to explain and selecting which combination of competing technologies to use.

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

Here's the documentation for Django Debug Toolbar:

[https://django-debug-toolbar.readthedocs.io/en/1.0/configuration.html](https://django-debug-toolbar.readthedocs.io/en/1.0/configuration.html)

Consider adding some options for the debug toolbar in the `development` settings module:

```
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_COLLAPSED": True,
}
```

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

## Add forms for CustomUser admin

```py
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ("email",)


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ("email",)
```

## Add CustomUser admin

```py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = (
        "email",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)

```

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

## Add `.coveragerc` to exclude files from coverage report

```
# .coveragerc
[run]
omit = manage.py
```

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

You can find the email that used to sign up here:

```
/var/lib/pgadmin/storage/
```

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

## Setup redis locally

[https://redis.io/topics/quickstart](https://redis.io/topics/quickstart)

[https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

Install redis:

```
sudo apt install redis-server
sudo apt install redis-tools
```

Edit the configuration file so that redis uses `systemd`:

```
sudo nano /etc/redis/redis.conf
```

Change the following line in `redis.conf`:

```
supervised systemd
```

Check on the status of the `redis-server` service:

```
sudo service redis-server status
```

We can verify that redis works, but first install the py-redis client:

```
# base.txt

redis==3.5.3
```

Run **`make pip-local`** to install the dependency to your local environment.

Redis stands for `remote dictionary service`. Using a Jupyter notebook or IPython, you can test the redis connection with:

```py
import os
import redis

REDIS_SERVICE_HOST = os.environ.get('REDIS_SERVICE_HOST', 'localhost')

REDIS = redis.Redis(
    host=REDIS_SERVICE_HOST,
    port=6379,
    db=0,
    charset="utf-8",
    decode_responses=True,
)
```

Redis will allow us to do several different things with our Django application:

- **caching**: this refers to storing responses in redis so that database queries can be avoided. This is useful for expensive queries that will likely not change frequently and it will also result in a faster request/response cycle.
- **async processing**: redis will help us do long-running tasks on "another computer", such as processing large files, sending emails, etc. Redis will keep track of the tasks that need to be processed. You can think about redis as a way to store python lists, dictionaries, sets, strings and numbers on a remote database. Redis offers some additional data types, as well. I'll use redis with `celery` later on.
- **web sockets**: redis will allow us to work with web sockets. This allows for real-time communication between the server and connected clients using web sockets.
- **constance**: Django constance is a package that allows you to configure settings that you can change in real-time. This will be used later
- more: there are likely other use cases that use redis. The examples listed here can usually use a number of different services such as `memcached` or `RabbitMQ`. A redis server can use dedicated numbered databases so that there is no possibility of key collision.

Check the redis connection using the CLI command:

```
# we can ping the local redis server with the following:
# redis-cli -h localhost -p 6379 ping
# the `-h` and `-p` arguments are the default host and port for redis-cli, so this is equivalent to:

redis-cli ping
PONG
```

## Add redis to docker-compose file for celery broker

## Setup redis-commander locally

Similar to how we installed `pgadmin4` to give us a GUI for our Postgres database, we can also install a GUI for our redis database that will provide a similar functionality and will also give us visibility into how our Django application interacts with redis.

First, install redis-commander with `npm`. Check you node and npm versions with:

```
node -v
v15.0.1
npm -v
7.0.3
```

Install the program in our global npm modules:

```
npm install -g redis-commander
```

We can now see this installed in our global dependencies with:

```
npm list -g --depth=0
```

Here are my globally installed npm packages:

```
npm list -g --depth=0
/home/brian/.nvm/versions/node/v15.0.1/lib
├── @quasar/cli@1.1.2
├── aws-cdk@1.70.0
├── generator-code@1.3.9
├── npm@7.0.3
├── redis-commander@0.7.0 <-- this is what we just installed
└── yo@3.1.1
```

Now start the redis-commander program with `redis-commander` and visit `http://127.0.0.1:8081`:

```
redis-commander
Using scan instead of keys
No Save: false
listening on 0.0.0.0:8081
access with browser at http://127.0.0.1:8081
Redis Connection localhost:6379 using Redis DB #0
```

You may need to add a new server in order to inspect a different redis database. Click on `More` > `Add Server`, add a `Display-Name` and a `Database Index`.

## Add a RequestLog model

Next let's add a model that will keep track of each request that is made to our application. On this model we will have the following fields:

- `user` (Foreign key to user model, store on `created_by` field from base model)
- `date` (use `created_on` field from base model)
- `path` (`/api/resource/1/`)
- `full_path` (`/api/resource/1/?query=something`)
- `execution_time` (in milliseconds)
- `response_code` (`200`, `301`, `404`, `500`, etc.)
- `method` (`GET`, `POST`, etc.)
- `remote_address` (IP address of connecting client)

Here's the model we can use:

```py
# apps/core/models.py
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class RequestLog(models.Model):
    """
    Request Log
    """

    user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, blank=True
    )
    date = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=3000)
    full_path = models.CharField(max_length=3000)
    execution_time = models.IntegerField(null=True)
    response_code = models.PositiveIntegerField()
    method = models.CharField(max_length=10, null=True)
    remote_address = models.CharField(max_length=20, null=True)
```

Add this code and then run the `makemigrations` management command to add the migration file.

## Add a middleware to handle RequestLog creation

Next we need to add a middleware that will create and save a `RequestLog` object on each request. We can use the following middleware:

```py
# apps/core/middleware.py
import logging
import time

from core.models import RequestLog

logger = logging.getLogger(__name__)


class RequestLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time
        response_ms = duration * 1000

        user = None
        if request.user.is_authenticated:
            user = request.user
        path = request.path
        full_path = request.get_full_path()
        method = str(getattr(request, "method", "")).upper()
        remote_address = self.get_client_ip(request)
        response_code = response.status_code

        request_log = RequestLog(
            user=user,
            path=path,
            full_path=full_path,
            execution_time=response_ms,
            response_code=response_code,
            method=method,
            remote_address=remote_address,
        )

        request_log.save()

        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
```

Add this middleware to Django's `MIDDLEWARE` settings value at the end of the list:

```py
MIDDLEWARE = [
    ...
    "apps.core.middleware.RequestLogMiddleware",
]
```

## Add an admin view for the RequestLog

```py
from django.contrib import admin

from .models import RequestLog


class RequestLogAdmin(admin.ModelAdmin):
    class Meta:
        model = RequestLog

    def get_queryset(self, request):
        qs = super(RequestLogAdmin, self).get_queryset(request)
        qs = qs.exclude(full_path__startswith="/admin/")
        return qs

    search_fields = ("full_path",)

    list_select_related = ("user",)

    list_filter = ("method", "response_code", "user")

    readonly_fields = (
        "user",
        "date",
        "path",
        "full_path",
        "execution_time",
        "response_code",
        "method",
        "remote_address",
    )
    list_display = (
        "id",
        "user",
        "date",
        "path",
        "full_path",
        "execution_time",
        "response_code",
        "method",
        "remote_address",
    )


admin.site.register(RequestLog, RequestLogAdmin)
```

## Setup Celery app

To setup celery, we need to do a few things:

1. Add `celery` to our installed packages
1. Add a `celery_app.py` file to configure celery
1. Import celery in `backend/backend/__init__.py`
1. Add settings to Django settings for celery
1. Define a celery task in our project code
1. Start a celery worker
1. Run the test task to confirm that it is working

You can read more about celery here: [https://docs.celeryproject.org/en/stable/getting-started/introduction.html](https://docs.celeryproject.org/en/stable/getting-started/introduction.html)

Also, the celery documentation has some helpful Django-specific settings that will be used here:
[https://docs.celeryproject.org/en/stable/getting-started/introduction.html](https://docs.celeryproject.org/en/stable/getting-started/introduction.html)

First, add celery to `requirements/base.txt`:

```
celery==5.0.5
```

Now reinstall pip requirements.

## Add `celery_app.py` to `backend/backend`

Here's the contents for the `celery_app.py` file:

```py
from celery import Celery
from django.conf import settings

app = Celery("backend")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
```

## Install celery in `backend/backend/__init__.py`

```py
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app

__all__ = ('celery_app',)
```

## Add celery settings to Django settings

Next the celery application can be configured in Django settings.

We need to tell celery about the redis server since this will be used as the broker.

You can think about the role that redis plays in the context of celery as a bulletin board.

In our Django application, we will post messages on the bulletin board. The contents of the bulletin board messages are all pretty simple. At a basic level, the messages will specify the name of a function defined in our Django project along with any arguments that should be passed to the function. Celery workers will constantly be checking the bulletin board for work and will take messages off of the board and start doing the work specified by the messages. That's celery in a nutshell. It can get a lot more complicated, but the bulletin board / worker analogy can be stretched to explain some of the more complex parts of celery's advanced features.

Here are the settings to add:

```py
# use `localhost` as the Redis server hostname unless `REDIS_SERVICE_HOST` is provided
REDIS_SERVICE_HOST = os.environ.get("REDIS_SERVICE_HOST", "localhost")
REDIS_PORT = 6379
BROKER_PORT = 1
RESULTS_PORT = 2

CELERY_BROKER_URL = f"redis://{REDIS_SERVICE_HOST}:{REDIS_PORT}/{BROKER_PORT}"
CELERY_RESULT_BACKEND = (
    f"redis://{REDIS_SERVICE_HOST}:{REDIS_PORT}/{RESULTS_PORT}"
)
CELERY_ACCEPT_CONTENT = ["application/json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
```

## Add a debug celery task

The simplest celery task we can write simply sleeps for 1 second and then returns a success message.

We can write a simple task that sleeps for 1 second in the `core` app.

Create a new file `apps/core/tasks.py` with the following celery task:

```py
import time

@app.task(queue="default")
def process_filing_list(filing_list_id):
```

## Run the celery command to start a worker

In a new terminal window, activate the virtual environment and run the following from the root directory of the project:

```
cd backend
```

Then run

```
DJANGO_SETTINGS_MODULE=backend.settings.development celery -A backend.celery_app:app worker -l INFO
```

```
 -------------- celery@DESKTOP-VF05L4R v5.0.5 (singularity)
--- ***** -----
-- ******* ---- Linux-4.19.128-microsoft-standard-x86_64-with-glibc2.29 2021-03-06 21:59:44
- *** --- * ---
- ** ---------- [config]
- ** ---------- .> app:         backend:0x7f9e8d48f880
- ** ---------- .> transport:   redis://localhost:6379/1
- ** ---------- .> results:     redis://localhost:6379/2
- *** --- * --- .> concurrency: 8 (prefork)
-- ******* ---- .> task events: OFF (enable -E to monitor tasks in this worker)
--- ***** -----
 -------------- [queues]
                .> celery           exchange=celery(direct) key=celery


[tasks]
  . apps.core.tasks.debug_task

[2021-03-06 21:59:44,833: INFO/MainProcess] Connected to redis://localhost:6379/1
[2021-03-06 21:59:44,842: INFO/MainProcess] mingle: searching for neighbors
[2021-03-06 21:59:45,878: INFO/MainProcess] mingle: all alone
[2021-03-06 21:59:45,884: WARNING/MainProcess] /home/brian/gitlab/django-step-by-step/.local-env/lib/python3.8/site-packages/celery/fixups/django.py:203: UserWarning: Using settings.DEBUG leads to a memory
            leak, never use this setting in production environments!
  warnings.warn('''Using settings.DEBUG leads to a memory

[2021-03-06 21:59:45,884: INFO/MainProcess] celery@DESKTOP-VF05L4R ready.
```

## Run the debug task

Now that we have a celery worker running, we are ready to post messages to our bulletin board. Let's open a Jupyter notebook and see how message are sent to redis (the bulletin). First, open a Jupyter notebook `Django Shell-Plus` session with:

```
make notebook
```

In a new notebook, run the following command:

```py
import time
from apps.core.tasks import debug_task

# calling `.delay` is what "posts" the message to redis (the bulletin board)
task = debug_task.delay()

print(f"Task ID is: {task}")
print(f"Task status is: {task.status}")
print(f"Task successful? {task.successful()}")
print(f"Type: {type(task)}")

print("waiting 2 seconds (the task should have been completed by now)")
time.sleep(2)

print(f"Task status: {task.status}")
print(f"Task successful? {task.successful()}")
```

```
Task ID is: 21846505-1473-4ba4-9544-dc969b6aa02c
Task status is: PENDING
Task successful? False
Type: <class 'celery.result.AsyncResult'>
waiting 2 seconds (the task should have been completed by now)
Task status: SUCCESS
Task successful? True
```

Notice that the terminal window in which we started the celery worker now has some output in the logs:

```
[2021-03-06 22:22:51,686: INFO/MainProcess] Received task: apps.core.tasks.debug_task[21846505-1473-4ba4-9544-dc969b6aa02c]
[2021-03-06 22:22:52,692: INFO/ForkPoolWorker-7] Task apps.core.tasks.debug_task[21846505-1473-4ba4-9544-dc969b6aa02c] succeeded in 1.0044008000113536s: 'Debug task slept for 1 second.'
```

We see that the task was received, and that it took about 1 second to complete (the length of time for which the task called `sleep`) and we see the task's result, which is the string `Debug task slept for 1 second.`

## Setup watchdog command for celery

If we want to change the length of time that the debug task sleeps for, then we will need to stop the celery worker and restart. As you develop tasks, stopping and restarting the celery worker can be tedious. We can have the celery worker restart automatically on code changes similar to how the Django development server (`runserver`, also `runserver_plus` that we are using) restarts automatically on code changes. To do this, we can use a package in our local development environment called `watchdog`.

Add the following to `requirements/dev.txt`:

```
watchdog==0.10.3
```

And then reinstall pip requirements with `make pip-local`.

Stop the current celery worker by pressing `Ctrl+C` in the terminal window, and then run the celery command again with watchdog (make sure you are running this from the `backend` directory):

```
DJANGO_SETTINGS_MODULE=backend.settings.development watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO
```

To make this easier to read, we can also write this command as:

```bash
DJANGO_SETTINGS_MODULE=backend.settings.development \
watchmedo \
    auto-restart \
    --directory=./ \
    --pattern=*.py \
    --recursive \
    -- \
    celery \
    -A \
    backend.celery_app:app \
    worker \
    -l \
    INFO
```

Since this is a little bit verbose, we can add this command as a `make` command in our `Makefile`:

```Makefile
start-celery-default-worker:
	DJANGO_SETTINGS_MODULE=backend.settings.development watchmedo auto-restart --directory=./ --pattern=*.py --recursive -- celery -A backend.celery_app:app worker -l INFO
```

Now the celery worker will be restarted whenever we make code changes to the Django project. We do have to remember to run the command from the correct directory and to set the `DJANGO_SETTINGS_MODULE` environment variable

## Setup flower for celery monitoring

Now that we have our celery worker running and processing tasks successfully, it would be good to add a tool to our project called `flower`. `flower` is a celery monitoring utility that provides a web interface for viewing task and worker status.

We can use flower in local development, but we can also use flower in production to monitor our tasks in a live environment. We can add the flower dependency to `dev.txt`:

```
flower==0.9.7
```

After re-installing dependencies, run the following command:

```
DJANGO_SETTINGS_MODULE=backend.settings.development celery flower -A backend.celery_app:app --address=127.0.0.1 --port=5555
```

```
[I 210306 23:17:22 command:135] Visit me at http://127.0.0.1:5555
[I 210306 23:17:22 command:142] Broker: redis://localhost:6379/1
[I 210306 23:17:22 command:143] Registered tasks:
    ['apps.core.tasks.debug_task',
     'celery.accumulate',
     'celery.backend_cleanup',
     'celery.chain',
     'celery.chord',
     'celery.chord_unlock',
     'celery.chunks',
     'celery.group',
     'celery.map',
     'celery.starmap']
[I 210306 23:17:22 mixins:229] Connected to redis://localhost:6379/1
```

Visiting `http://127.0.0.1:5555` should show that there is a celery worker online. Try stopping and restarting the celery worker and you can see that the worker `STATUS` changes from `Online` to `Offline` and then back to `Online`. Try running the celery task again from the Jupyter notebook and you should see 1 task in `Active` and `Processed` and then once the task finished we should see 1 task in the `Succeeded` column.

Celery can also be started with the following command:

```
flower -A backend.celery_app:app --broker=redis://localhost:6379/1
```

## Decide if you need `CELERY_TASKS_ALWAYS_EAGER` to be set to `True`

Depending on the type of celery tasks your app uses, you may or may not want to use a special Django setting that will run the task directly on the webserver and not on the worker. It can also be said that this setting runs the celery tasks synchronously when `CELERY_TASKS_ALWAYS_EAGER = True`. If your tasks involve simple steps like sending email or doing relatively fast processing, this might be fine.

If you want to simulate celery workers running in your local environment in a way similar that they would be running in production, you can also start different celery processes that can run one or more queues.

First it will be shown using the `CELERY_TASKS_ALWAYS_EAGER = True` setting, and second it will be shown how to use separate celery worker processes to simulate a production environment on a local development machine.

## Setup celery beat, settings, periodics tasks

One nice feature of celery is that it allows us to easily schedule tasks that should be performed on regular intervals, similar to how cron jobs schedule tasks.

This is provided through a part of celery called `beat`.

To use celery, we need to define a `CELERY_BEAT_SCHEDULE` in Django settings and then start another process to start celery beat. This process will send messages to Redis (the bulletin board) at regular intervals that will be processed by celery workers.

We can use another "debug" task for celery beat:

```
@app.task
def celery_beat_debug_task():
    return "Celery debug task complete."
```

## Run the celery beat process

Run the following command to start celery beat:

```bash
DJANGO_SETTINGS_MODULE=backend.settings.development \
    celery \
    --app=backend.celery_app:app \
    beat \
    --loglevel=INFO
```

```
celery beat v4.4.7 (cliffs) is starting.
__    -    ... __   -        _
LocalTime -> 2021-03-06 23:53:35
Configuration ->
    . broker -> redis://localhost:6379/1
    . loader -> celery.loaders.app.AppLoader
    . scheduler -> celery.beat.PersistentScheduler
    . db -> celerybeat-schedule
    . logfile -> [stderr]@%INFO
    . maxinterval -> 5.00 minutes (300s)
[2021-03-06 23:53:35,922: INFO/MainProcess] beat: Starting...
[2021-03-06 23:53:45,934: INFO/MainProcess] Scheduler: Sending due task celery-beat-debug-task (apps.core.tasks.celery_beat_debug_task)
[2021-03-06 23:53:55,930: INFO/MainProcess] Scheduler: Sending due task celery-beat-debug-task (apps.core.tasks.celery_beat_debug_task)
```

Now we should be able to see `celery_beat_debug_task` tasks processed by the celery worker.

The only issue is that our celery beat configuration will not be reloaded automatically like celery and the Django development server do. To fix this, we can use `watchdog`:

Stop the celery beat process and run the following command from the backend directory:

```
DJANGO_SETTINGS_MODULE=backend.settings.development \
    watchmedo \
    auto-restart \
    --directory=./ \
    --pattern=*.py \
    --recursive \
    -- \
    celery \
    --app=backend.celery_app:app \
    beat \
    --loglevel=INFO
```

Now try changing the celery beat task to be fired every 2 seconds or some other value.

## Setup mailhog for testing email locally

Mailhog is a simple tool that I use when working with email. If your Django application involves sending email from the application, I recommend using Mailhog to preview emails that will be sent from Django.

Mailhog is written in go, so you will need to do the following to use it locally:

```
sudo apt-get -y install golang-go
go get github.com/mailhog/MailHog
```

Once it has finished installing, run the following command to start Mailhog:

```
~/go/bin/MailHog
```

Then you can see Mailhog in the browser by going to `http://localhost:8025/`.

We can write a simple task that will send an email, but we first need to tell Django what to use to send email, so we can add the following lines to `base.py`

```py
# Email
EMAIL_HOST = os.environ.get("DJANGO_EMAIL_HOST", "localhost")
EMAIL_PORT = os.environ.get("DJANGO_EMAIL_PORT", "1025")
```

It is generally a good idea to send email from celery, so let's create an `email_debug_task` task in `apps/core/tasks.py`:

```py
@app.task
def send_email_debug_task():

    email = EmailMessage(
        "Django Step-by-step",
        "This email was sent from Celery.",
        os.environ.get("DJANGO_EMAIL_HOST_USER", "debug+email@local.dev"),
        [settings.ADMIN_EMAIL],
    )

    email.send()
```

Now we can call this task from Jupyter notebook:

```py
import time
from apps.core.tasks import send_email_debug_task

send_email_debug_task.delay()
```

We should now see the email in Mailhog.

## Build a Model that we can use to demonstrate CRUD and other concepts

Now we can turn to our Django application and setup a model that we can use for demonstration purposes. We will use this model to demonstrate some of the following patterns that are often used in Django projects.

- More complex data relationships
- Templates
- Views
- Forms
- Media files
- DRF, Serializers
- Web sockets
- Testing patterns with pytest and factory

Let's suppose we are developing a microblogging application and we want to allow users to create posts. Our post model will contain a text field with a limited number of characters and will optionally allow users to upload media files such as images and gifs.

Before we build the model, we should build a new Django app that will contain the majority of the logic for our application.

## Create a new Django app for our microblogging demo application

Again, the typical way to add an app to a Django application would be the following command:

```
django-admin startapp blog
```

We want to create the app in the `apps` directory that we have created in the root of our Django project (the `apps` directory is located in the same directory as `manage.py`)

```
mkdir -p backend/apps/blog && django-admin startapp blog ./backend/apps/blog
```

Make sure to add `apps.blog` to the `INSTALLED_APPS` in `base.py`.

## Add the model for our microblogs posts

Next we can add a post model to the `blog` app that was created.

Let's consider both a simple version of our post model, and a more complex model.

For a simple model, we can do something like this:

```py
# simple Post model
from apps.core.models import BaseModel


class Post(BaseModel):
    body = models.CharField(max_length=200)
```

A more complicated model might include some of the features you would see on a site like Twitter:

```py
# a more complex Post model
from apps.core.models import BaseModel


VISIBILITY_OPTIONS = [
    (1, "Public"),
    (2, "Private"),
    (3, "Visible to Friends")
]

class Post(BaseModel):
    user = models.ForeignKey()
    text = models.TextField()
    visibility = models.SmallIntegerField(options=VISIBILITY_OPTIONS)
    likes = models.ManyToManyField(through=PostLike)
    hashtags = models.ManyToManyField(Hashtag)
    mentions = models.ManyToManyField()
    repost = models.ForeignKey('self')
```

We can start wit a simple model for now, and then explore adding additional features of a more complex model later.

The simple model will have the `body` field and the four fields from the `BaseModel` that it inherits from: `created_on`, `modified_on`, `created_by` and `modified_by`. It doesn't really make sense to have the `modified_by` attribute on the `Post` model since only the creator of a post will be able to edit that post. We could either include it, or we can set the `modified_by` attribute to `None` on our `Post` model.

## Run `makemigrations`

Next run the `makemigrations` command:

```
$ python3 backend/manage.py makemigrations
Migrations for 'blog':
  apps/blog/migrations/0001_initial.py
    - Create model Post
```

Check out the `0001_initial.py` file that was generated and we can see the fields that will created for our `Post` model (when we run the `migrate` command):

- `id`
- `created_on`
- `modified_on`
- `body`
- `created_by`

## Run the `migrate` command

```
$ python3 backend/manage.py migrate
Operations to perform:
  Apply all migrations: accounts, admin, auth, blog, contenttypes, core, sessions
Running migrations:
  Applying blog.0001_initial... OK
```

## Register the `Post` model to the Django admin

The first thing I usually do after creating or changing a model is to register that model to the Django admin. To do this, we can add a few lines of code to the `admin.py` file in our `blog` app:

```py
# apps/blog/admin.py
from django.contrib import admin

# Register your models here.
from .models import Post

admin.site.register(Post)
```

This gives us an interface that we can use to start doing CRUD with our new model. This is one of the big selling points of Django! It is possible to make changes to the behavior of the admin, but you are generally supposed to use this for only admin purposes, not for anything that is face non-technical end users of your application.

Click on the `Posts` model, and add a Post with the `Add Post` button. You will then see our post:

```
Post object (1)
```

## Add a \_\_str\_\_ method to our model

It would be better if we could see a preview of the post text. We can implement this by adding a `__str__` method to our `Post` model:

```
    def __str__(self):
        return self.body
```

## Add model factories for micro blog post

Now that we have a basic working model, we can start adding some tools that will help us test our application's logic. I have had good experiences using `factory`.

Add factory to the `test.txt` dependencies file:

```
factory-boy==3.2.0
```

Install the depenencies again with:

```
pip3 install -r backend/requirements/test.txt
```

## Setup a `factory.py` file in the blog app with a `PostFactory`

```py
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

from apps.blog.models import Post

User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User


# Another, different, factory for the same object
class PostFactory(DjangoModelFactory):
    class Meta:
        model = Post
```

## Create a simple test using `PostFactory`

```py
import pytest

from django.test import TestCase
from apps.blog.factory import PostFactory
from apps.blog.models import Post


@pytest.mark.django_db(transaction=True)
def test_post():

    POST_TEXT = "This is a test post."

    # this saves the post in the database
    post = PostFactory(body=POST_TEXT)

    # this queries the database for the number of posts
    post_count = Post.objects.count()

    # checks to see if the number of posts queried is 1
    assert post_count == 1

    # checks that the post has the body that we assigned to it in the test
    assert post.body == POST_TEXT
```

This is typically not the type of test we want to write, but this does help to make sure that everything is setup correctly. The problem with this test is that it doesn't test any of the logic in our application. Later on we will write some tests that do test specific parts of our application logic.

## Create a URL pattern that will list all of the blog posts

Create `apps/blog/urls.py` with the following code:

```py
from django.urls import path

from apps.blog import views

urlpatterns = [
    path("posts/", views.posts),
]
```

## Include the URLs you just created in the main URLs file

Django uses the `backend/urls.py` to find URLs in our application. Even though we defined a `urls.py` file in our `blog` app, Django doesn't know about it. In order to let Django know about these URLs, add the following line of code to `backend/urls.py`:

```py
urlpatterns = [
    path("", include("apps.blog.urls")), # <-- add this line
    path("my-admin-portal/", admin.site.urls),
]
```

## Create a simple function-based view for viewing all posts

In `apps/blog/views.py` add a `posts` function:

```py
from django.shortcuts import render

from apps.blog.models import Post


def posts(request):
    context = {"posts": Post.objects.all()}
    return render(request, template_name="posts.html", context=context)
```

## Create a `templates` directory in the `blog` app and add `posts.html`

```
{% extends "base.html" %}

This is the post template
```

## Add `"DIRS": [BASE_DIR / "templates"],` to `settings/base.py`

```py
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"], # <-- this line
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
```

## Add a new folder in the `backend` directory called `templates` and add `base.html`

We are now going to implement template inheritance ([https://docs.djangoproject.com/en/3.1/ref/templates/language/#template-inheritance](https://docs.djangoproject.com/en/3.1/ref/templates/language/#template-inheritance))

```
This is the base template
```

## Add Bootstrap to our base template

## Write a management command that generates fake data

To test out our template logic, we can generate some posts. We can use the `faker` library to do this along with a Django managment command.

Create the following file in `apps/blog/management/commands/generate_posts.py`:

```py
from django.core.management.base import BaseCommand

from apps.blog.factory import PostFactory


class Command(BaseCommand):
    help = "Generate some posts"

    def handle(self, *args, **options):

        print("generating posts")
        for _ in range(20):
            PostFactory()

        print("finished generating posts")
```

## Add pagination to posts view

We should add pagination so we can limit the number of posts that are shown.

[https://docs.djangoproject.com/en/3.1/topics/pagination/#using-paginator-in-a-view-function](https://docs.djangoproject.com/en/3.1/topics/pagination/#using-paginator-in-a-view-function)

```py
from django.core.paginator import Paginator
```

## Create a post detail view

## Add URL for post detail view

```py
    # read (detail)
    path("posts/<str:id>", views.post, name="post"),
```

## Create a template called `post.html` in templates

## Link to detail views from the list view

## Set up <head> for Post detail page for SEO

## Add Post Create Form

We can generate posts through the admin and through our management command. Now let's add a way for users to add posts.

## Add a URL for a creating a new post

## Add `new_post.html` template

## Change the ordering of posts in the Post model

```py
class Post(BaseModel):

    # meta class
    class Meta:
        ordering = ("-created_on",)
```

## Add wildcard to `ALLOWED_HOSTS` in `development` settings module

This will allow you to view the appliction from a mobile device on your local network

## Use Django messaging framework to update user on post creation success

## Create `urls.py` in the accounts app with a login path

## Create the login view in `apps/accounts/views`

## Override the Default Login form

[https://stackoverflow.com/questions/55369645/how-to-customize-default-auth-login-form-in-django/55369791](https://stackoverflow.com/questions/55369645/how-to-customize-default-auth-login-form-in-django/55369791)

## Set `LOGIN_REDIRECT_URL` and `LOGIN_REDIRECT_URL` in `base` settings module

```py
LOGIN_REDIRECT_URL = "/posts"
LOGOUT_REDIRECT_URL = "/posts"
```

## Create Login page

## Enable logout

## Create update view for post

## Create update URL for post

```

```

## Add delete URL path for posts

## Create delete view for post

## Enable searching posts

## Fix pagination with search term

Add the following do each of the links in the pagination section of the post list. This will ensure that the search term query parameter and pagination can be used together.

```html
<a
  href="?page={{ page_obj.previous_page_number }}{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}"
  >previous</a
>
```

If there are lots of other parametes to add, use the following solution:
[https://stackoverflow.com/questions/2047622/how-to-paginate-django-with-other-get-variables](https://stackoverflow.com/questions/2047622/how-to-paginate-django-with-other-get-variables)

## Add registration URL

## Add registration view

There are a lot of ways to do registration, and lots of packages that can help with this process.

We can start with a simle implementation that allows us to signup with an email address with a confirmation email. Since we have already setup MailHog, this should be easy.

## Add registration form

## Add email confirmation url and view

## Add request Password reset form

## Add password reset email with link

## Add password reset URL

## Add password reset form

## Add password reset view

## Add Vue via CDN in `base.html`

[https://v3.vuejs.org/guide/installation.html#cdn](https://v3.vuejs.org/guide/installation.html#cdn)

```html
<script src="https://unpkg.com/vue@next"></script>
```

## Add an example of how to setup a Vue component in Django template

```html
{% for post in page_obj %}
<a href="/posts/{{ post.id }}" style="text-decoration: none; color: #000">
  <div class="card p-4 mb-2">
    <div class="">{{ post.body }}</div>
    <div class="">{{ post.created_on }}</div>
    {% if post.created_by %}
    <div>{{ post.created_by }}</div>
    {% endif %} {% include "post_likes.html" with post_id=post.id
    like_count=post.like_count liked=post.liked %}
  </div>
</a>
{% endfor %}
```

Notice the `{% include "post_likes.html" ... %}`, will add a nested template with different parameters to our page that will contain a clickable heart button that will make an API call to the backend.

## Create a template called `post_likes.html`

```
backend/apps/blog/templates/post_likes.html
```

## Add Vue component definition and template

Notice how the Javascript `const` definition for the Vue component contains a Django template variable. We need to do this so the name of each created Vue component is unique.

```js
const LikeCounter{{ post_id }} = {
  delimiters: ["[[", "]]"],
  data() {
      return {
      counter: {{ like_count }},
      liked: {{ liked | lower }},
      };
  },
}

Vue.createApp(LikeCounter{{ post_id }}).mount("#counter-{{ post_id }}");
```

## Add axios Via CDN

```html
<!-- Axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

## Configure Axios CDN

```html
<!-- configure axios to use csrftoken -->
<script>
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
</script>
```

## Add a method to the PostLike component that will make an API call using axios

```js
    methods: {
        async toggleLike() {
            try {
                const resp = await axios.post("/api/posts/{{ post_id }}/like");
                console.log(resp.data);
                this.counter = resp.data.likes;
                this.liked = resp.data.like;
            } catch (err) {
                console.log(err);
                alert("Please login or create an account to like posts");
            }
        }
    }
```

## Setup an endpoint that will handle our axios call

```py
    path("api/posts/<str:id>/like", views.like_post, name="like-post"),
```

## Setup a view to handle the like-post endpoint that returns a JsonResponse

```py
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST


@login_required
@require_POST
def like_post(request, id):

    # implement like post logic
    post = get_object_or_404(Post, id=id)

    if request.user not in post.likes.all():
        post_like_through_model = PostLike(post=post, liked_by=request.user)
        post_like_through_model.save()
        like = True
    else:
        post.likes.remove(request.user)
        like = False

    post_like_count = post.likes.all().count()
    return JsonResponse({"likes": post_like_count, "like": like})

```

## Implement through Model for ManyToMany field for Post likes

```py
# apps/blog/models.py
class PostLike(models.Model):
    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
```

## Add through model to Django admin

```py
admin.site.register(PostLike)
```

## Run `makemigrations` and `migrate` for PostLike

## Add `prefetch_related("created_by")` to post list query to reduce DB queries

## Add a favicon in static

Add `favicon.ico` to the `static` folder.

```html
<link rel="shortcut icon" type="image/png" href="{% static 'favicon.ico' %}" />
```

## Add `.github/workflows/lint.yml` for GitHub Action that lints Python code

Let's add a GitHub action following this example.

[https://docs.github.com/en/actions/quickstart](https://docs.github.com/en/actions/quickstart)

```yml
name: lint-and-test-python

# Run this workflow every time a new commit pushed to your repository
on:
  push:
    branches:
      - main

jobs:
  # Set the job key. The key is displayed as the job name
  # when a job name is not provided
  lint-and-test-python:
    # Name the Job
    name: Lint and test python code
    # Set the type of machine to run on
    runs-on: ubuntu-latest

    # Service containers to run with `container-job`
    services:
      # Label used to access the service container
      postgres:
        # Docker Hub image
        image: postgres
        # Provide the password for postgres
        env:
          POSTGRES_PASSWORD: postgres
        # Set health checks to wait until postgres has started
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

        ports:
          # Maps tcp port 5432 on service container to the host
          - 5432:5432

    strategy:
      matrix:
        python-version: [3.8]

    steps:
      # Setup python version
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      # Checks out a copy of your repository on the ubuntu-latest machine
      - name: Checkout code
        uses: actions/checkout@v2

      # install pip dependencies
      - name: pip install
        run: |
          python -m pip install --upgrade pip
          pip install -r backend/requirements/base.txt
          pip install -r backend/requirements/dev.txt
          pip install -r backend/requirements/test.txt

      # lint python code using flake8
      - name: Lint code
        run: flake8 backend

      # run pytest tests
      - name: Run pytest tests
        run: pytest backend
```

## Generic Class Based Views

We can reimplement our application logic with generic class-based views (GCBVs). There's nothing wrong with out function-based views (FBVs). The code is straightforward and relatively easy to understand. GCBVs will let us acheive the same functionality with fewer lines of code. You can use only CBVs, only GBVs or a mix of the two together. However you decide to write your view, GCBVs are in import part of Django that you should know about.

This project demonstrates implementations of FBVs and GCBVs, as well as other ways of expressing our views using the Django REST Framework, which also has a similar concpet of FBVs and GCBVs.

## Create a file in the `blog` app called `class_based_views.py`

```
touch backend/apps/blog/class_based_views.py
```

## Add a generic `ListView` to the `class_based_views` file

```py
# class_based_views.py
from django.views.generic import ListView
from apps.blog.models import Post


class PostList(ListView):
    model = Post
```

**Note**: the name of the file `cbv_urls.py` doesn't matter.

## Setup a new URLs file

Let's add a new URLs file to the `blog` app that will contain urls for our GCBVs.

```
touch backend/apps/blog/cbv_urls.py
```

## Add a `urlpatterns` with a path that uses the `PostList` CBV

```py
# URLs for GCBVs

from django.urls import path
from apps.blog.class_based_views import PostList

urlpatterns = [
    path("posts", PostList.as_view()),
]
```

## Include `cbv_urls.py` in `backend/urls.py`

```py
    path("cbv/", include("apps.blog.cbv_urls")),
```

Now visit `http://127.0.0.1:8000/cbv/posts` and we will see the following error:

```
django.template.exceptions.TemplateDoesNotExist
```

## Fix the template for the PostList CBV

Class based-views expect to find a template at `blog/post_list.html` in our app's `templates` directory. We can put a template there, or we can override the location by adding `template_name` to `PostList`:

```py
class PostList(ListView):
    model = Post
    template_name = "blog/posts.html"
```

## Add CBV DetailView for viewing a single post

```py
class PostDetailView(DetailView):
    model = Post
```

## Add URL path for DetailView

```py
    path("posts/<int:pk>", PostDetailView.as_view()),
```

## Add a teplate for the PostDetailView in `blog/post_detail` in the `blog` app `templates` directory

```html

```

## Add a PostCreateView for creating posts using CBV

## Add a PostUpdateView for editing posts

- tempalte
- URL pattern
- CBV
- tests

## Add a DeletePostView for deleting posts

## Add tests for CBVs

## Account Management

## Add profile view

- All posts
- Likes
- Post likes
- tests

## Add account settings view

- Delete account
- Change password

## Refactor QuerySet and Manager for Post model

## Account settings

## Django REST Framework

## Add Django REST Framework to `base.txt` dependencies

```
djangorestframework==3.12.4
```

## Add `restframework` to `INSTALLED_APPS` in base settings module

```py
    "rest_framework",
```

## Add REST Framework URLs under the `if settings.DEBUG` block in `backend/urls.py`

```py
    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]
```

## Add OpenAPI/SwaggerUI URL path in `backend/urls.py`

```py
from django.views.generic import TemplateView

urlpatterns = [
    path(
        "api/swagger-ui/",
        TemplateView.as_view(
            template_name="swagger-ui.html", extra_context={"schema_url": ""},
        ),
        name="swagger-ui",
    ),
    ...
```

## Add the following file to the top-level templates directory

**templates/swagger-ui.html**

```html
{% load static %}
<!DOCTYPE html>
<html>
  <head>
    <title>Swagger</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      type="text/css"
      href="//unpkg.com/swagger-ui-dist@3/swagger-ui.css"
    />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="//unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script>
      const ui = SwaggerUIBundle({
        url: "{% static 'openapi/schema.yml' %}",
        dom_id: "#swagger-ui",
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        layout: "BaseLayout",
        requestInterceptor: (request) => {
          request.headers["X-CSRFToken"] = "{{ csrf_token }}";
          return request;
        },
      });
    </script>
  </body>
</html>
```

## Add dependencies for OpenAPI to base.txt

```
# for OpenAPI
uritemplate==3.0.1
coreapi==2.3.3
pyyaml==5.4.1
```

## Create a directory for the OpenAPI Schema

```
mkdir backend/static/openapi
```

## Generate the OpenAPI schema

```
python3 backend/manage.py generateschema > backend/static/openapi/schema.yml
```

Add a `make` command for this:

```yml
openapi: python3 backend/manage.py generateschema > backend/static/openapi/schema.yml
```

Visit `localhost:8000/api/swagger-ui/` and we should see an empty OpenAPI/Swagger UI page. As we build an API for our microblog application, this page will be populated.

## Add `PostSerializer` in `serializers.py`

```
touch backend/apps/blog/serializers.py
```

```py
from rest_framework import serializers

from apps.blog.models import Post

from apps.accounts.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    liked = serializers.BooleanField(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "body",
            "created_by",
            "modified_on",
            "liked",
            "like_count",
        )
```

## Add CRUD DRF FBVs for `blog` app

- [x] Read (detail)
- [x] Read (list)
- [x] Create
- [x] Update
- [x] Delete
- [x] Tests

## Add CRUD DRF CBVs for `blog` app

- [x] Use `viewsets.ModelViewSet`

## Add CRUD GCBVs for `blog` app??

## GraphQL Setup Tasks

- Resources
- Install packages
- Configurure settings
- JWT Token Auth setup
- PostType
- PostLikeType
- UserType
- AccountType
- PostMutation for creating, updating and deleting
- Query post by ID
- PostLikeMutation for liking a post
- Handle permissions correctly for all mutations
- Pagination
- Filtering
- Sorting
- Relay
- Insomnia Client
- Testing Authentication
- Testing Post queries and mutations (permissions!)
- Pytest and Class Based tests
- Add links in nav UI for GraphiQL

## TODO: replace Exceptions with GraphqlExceptions

## GraphQL Resources

- [https://graphene-python.org/](https://graphene-python.org/)
- [https://www.howtographql.com/graphql-python/1-getting-started/](https://www.howtographql.com/graphql-python/1-getting-started/)

## Add GraphQL dependencies

GraphQL is another way to access data in our application. One of the main advantages of GraphQL is that it is easier to request the data that you need from the frontend.

Here's a helpful guide that we can use as a reference:

[https://www.howtographql.com/graphql-python/1-getting-started/](https://www.howtographql.com/graphql-python/1-getting-started/)

```
# base.txt

# graphql
graphene-django==2.15.0
```

## Add `graphene_django` to `INSTALLED_APPS`

## Add `GRAPHENE` settings to `base.py`

```py
GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
}
```

## Add `schema.py` in the `blog` app directory

```py
import graphene
from graphene_django import DjangoObjectType

from apps.blog.models import Post


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query(graphene.ObjectType):
    posts = graphene.List(PostType)

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()
```

## Add a `schema.py` to the `backend/backend` directory

```py
import graphene

import apps.blog.schema


class Query(apps.blog.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
```

## Add a GraphQL endpoint to `backend/urls.py`

```py
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    ...
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
```

## Add Cypress Dependencies

Following along with [https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements):

```
sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

Install cypress with:

```
npm install cypress --save-dev
```

## Start Cypress

```
$(npm bin)/cypress open
```

## Use npm to open Cypress

```
npx cypress open
```

## Using on WSL 2

Cypress is not supported on WSL 2 without some workarounds. You can run the following command to run Cypress in headless mode:

```
node_modules/.bin/cypress run
```

## Frontend clients

## Add Vue as standalone SPA (show how API calls will not work without CORS)

## Add CORS

## Add NGINX and remove CORS

## Add NGINX Dockerfile for local development

## Setup Django Channels (settings, routers, consumers, async tests)

## Setup git hooks in docker-compose

## Setup Vue in NGINX (web-sockets for hot reloading, index.html, etc)

## Add Session Authentication for Vue SPA

## Use Nuxt for SSR

## Setup .gitlab-ci.yml

## Setup gitlab-runner

## Show how to setup e2e tests with Cypress

## Draw a project diagram using diagrams.net

## Generate model visualizations with graphviz

## Django Doctor

## VSCode remote container

## Add a privacy policy

## Cookie consent form

## Add a constants file

In general it is not idea to have strings with the same value used in multiple parts of your application's code. One place where we have used the same string values is in multiple places is Bootstrap class names in Django forms.

We can use a file in our core app called `constants.py` and import this like:

```
from apps.core import constants as c
```

Then we can add values to this such as:

```
BOOTSTRAP_ALERT_SUCCESS = "alert alert-success"
```

This will make it easier for us to keep track of things. If we need to change our CSS Framework from Bootstrap to something else, this will be easy to when we are using constants instead of duplicate strings.

Create a `constants.py` file:

```
touch backend/apps/core/constants.py
```

## Install poetry

[https://github.com/python-poetry/poetry#installation](https://github.com/python-poetry/poetry#installation)

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python -
```

Check the version:

```
poetry --version
```

## Run `poetry init` to setup `pyproject.toml`

```
cd backend && poetry init
```

```
$ cd backend && poetry init

This command will guide you through creating your pyproject.toml config.

Package name [backend]:
Version [0.1.0]:
Description []:
Author [Brian Caffey <briancaffey2010@gmail.com>, n to skip]:  n
License []:
Compatible Python versions [^3.8]:

Would you like to define your main dependencies interactively? (yes/no) [yes]
You can specify a package in the following forms:
  - A single name (requests)
  - A name and a constraint (requests@^2.23.0)
  - A git url (git+https://github.com/python-poetry/poetry.git)
  - A git url with a revision (git+https://github.com/python-poetry/poetry.git#develop)
  - A file path (../my-package/my-package.whl)
  - A directory (../my-package/)
  - A url (https://example.com/packages/my-package-0.1.0.tar.gz)

Search for package to add (or leave blank to continue):

Would you like to define your development dependencies interactively? (yes/no) [yes]
Search for package to add (or leave blank to continue):

Generated file

[tool.poetry]
name = "backend"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"


Do you confirm generation? (yes/no) [yes]
```

Optional/Extra steps

## GraphQL (together with or replacing DRF/REST)

## Spatial and Geographic Databases (PostGIS)

## Portainer UI for viewing containers and logs

## Wagtail for managing blog content
