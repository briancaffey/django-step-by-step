# Notes on using this project on a Mac

## Python versions

There is an issue with python3.9, so it is recommended to use pyton3.8:

[https://formulae.brew.sh/formula/python@3.8](https://formulae.brew.sh/formula/python@3.8):

```
brew install python@3.8
```

On Mac M1, you may need to install with brew with:

```

```

To use python3.8 with poetry, run:

```
poetry env use 3.8
```

This will create a new poetry virtual environment with python3.8 when you install with:

```
make poetry-install
```

when running from the project root, or

```
poetry install
```

from the `backend` directory.

## Pytest

When running the tests locally, you need to grant the database user the `createdb` permission:

```
~/git/github/django-step-by-step$ psql postgres
psql (13.3)
Type "help" for help.

postgres=# alter user postgres createdb;
```

## Python 3.9

Commands for using x86_64 architecture (Rosetta 2):

```
/usr/local/bin/python3.9 -m venv .local-env
```

```
/usr/local/bin/pip3.9 install -r backend/requirements_dev.txt
```
