# Deploying this application to Heroku

This page will document the process for deploying the application to Heroku. You will need:

- A Heroku account
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

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

````
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

To deploy our application, we would simply run:

```
git push heroku main
```

But this would fail due to the fact that our Django project is not in the root directory of our project. Instead, it is in the `backend` directory. We can try adding a symlink for our `requirements.txt` file that poetry exports:

```
ln -s backend/requirements.txt requirements.txt
```

