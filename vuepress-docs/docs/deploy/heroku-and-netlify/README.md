---
next: /deploy/digital-ocean
prev: /deploy/raspi
---

# Deploying this application to with Heroku and Netlify

[[toc]]

This page will document the process for deploying the application with Heroku and Netlify. You will need:

- A Heroku account
- A Netlify account
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Configuring Heroku

```
brew tap heroku/brew && brew install heroku
```

For Mac M1, you might need to do:

```
brew tap heroku/brew
arch -arm64 brew install heroku
```

The login to Heroku:

```
heroku login
```

Then create a Heroku project in the root of the project:

```
$ heroku create
Creating app... done, ⬢ polar-reaches-72024
https://polar-reaches-72024.herokuapp.com/ | https://git.heroku.com/polar-reaches-72024.git
```

Notice that there is a new remote in git:

```
git remote -v
heroku  https://git.heroku.com/polar-reaches-72024.git (fetch) <-- new
heroku  https://git.heroku.com/polar-reaches-72024.git (push) <-- new
origin  git@github.com:briancaffey/django-step-by-step.git (fetch)
origin  git@github.com:briancaffey/django-step-by-step.git (push)
```

### Create a Procfile

```
web: cd backend && ./scripts/start_prod.sh
```

### Create a `runtime.txt` in the root directory

```
python-3.9.5
```

To deploy our application, we would simply run:

```
git push heroku main
```

But this would fail due to the fact that our Django project is not in the root directory of our project. Instead, it is in the `backend` directory. We can try adding a symlink for our `requirements.txt` file that poetry exports:

```
ln -s backend/requirements.txt requirements.txt
```

### Enable postgres addon

```
heroku addons:create heroku-postgresql:hobby-dev
```

```
Creating heroku-postgresql:hobby-dev on ⬢ polar-reaches-72024... free
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Created postgresql-transparent-19918 as DATABASE_URL
Use heroku addons:docs heroku-postgresql to view documentation
```

### Environment Variables

Next we will need to set environment variables for our Heroku project:

```
heroku config:set DEBUG=0
```

#### AWS Access Keys for S3

```
heroku config:set AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
heroku config:set AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
```

#### S3 Bucket name

```
heroku config:set S3_BUCKET_NAME=$S3_BUCKET_NAME
```

#### Django Settings Module

```
heroku config:set DJANGO_SETTINGS_MODULE=backend.settings.heroku
```

#### Disable collectstatic

```
heroku config:set DISABLE_COLLECTSTATIC=1
```

#### Configure SECRET_KEY

```
heroku config:set SECRET_KEY=$SECRET_KEY
```

### Push to Heroku on a non-`main` branch

```
git push heroku feature/post-images:main
```

### Management Commands

To open a shell in the Django application:

```
heroku run bash
```

Then you can run the following command:

```
python3 backend/manage.py shell
```

### Heroku Config

Set the `FRONTEND_URL` environment variable in Heroku to the Netlify URL.

This will allow the Heroku app to link to the Netlify URL correctly.

For example:

```
heroku config:set FRONTEND_URL=https://mystifying-ardinghelli-30e1a3.netlify.app/
```

### LOGGING

[https://stackoverflow.com/questions/18920428/django-logging-on-heroku](https://stackoverflow.com/questions/18920428/django-logging-on-heroku)

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': ('%(asctime)s [%(process)d] [%(levelname)s] ' +
                       'pathname=%(pathname)s lineno=%(lineno)s ' +
                       'funcname=%(funcName)s %(message)s'),
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        }
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'testlogger': {
            'handlers': ['console'],
            'level': 'INFO',
        }
    }
}
```

## Configuring Netlify

Add the following to the project's deploy settings:

```
Base directory: quasar-app
Build command: quasar build -m pwa
Publish directory: quasar-app/dist/pwa
```

These settings will tell Netlify how to build the application.

### `NODE_VERSION`

Add an environment variable called `NODE_VERSION` to project's `Environment` settings under the `Build & deploy` tab. Set this variable to `12.22.1`.

### `API_URL`

Add another environment variable called `API_URL` set to the Heroku URL. For example:

```
https://fathomless-shelf-16475.herokuapp.com
```

### Redirect file

Link: [https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/)

Add a file called `_redirects` to the `public` folder.

```
/* /index.html 200
```

It is also possible to configure redirects with a `netlify.toml` file.

### Heroku Config

Set the `FRONTEND_URL` environment variable in Heroku to the Netlify URL.

This will allow the Heroku app to link to the Netlify URL correctly.

For example:

```
heroku config:set FRONTEND_URL=https://mystifying-ardinghelli-30e1a3.netlify.app/
```