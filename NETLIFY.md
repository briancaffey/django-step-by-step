# Notes on Deploying the Quasar Application to Netlify

## Project settings

Add the following to the project's deploy settings:

```
Base directory: quasar-app
Build command: quasar build -m pwa
Publish directory: quasar-app/dist/pwa
```

These settings will tell Netlify how to build the application.

## `NODE_VERSION`

Add an environment variable called `NODE_VERSION` to project's `Environment` settings under the `Build & deploy` tab. Set this variable to `12.22.1`.

## `API_URL`

Add another environment variable called `API_URL` set to the Heroku URL. For example:

```
https://fathomless-shelf-16475.herokuapp.com
```

## Redirect file

Link: [https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/)

Add a file called `_redirects` to the `public` folder.

```
/* /index.html 200
```

It is also possible to configure redirects with a `netlify.toml` file.

## Heroku Config

Set the `FRONTEND_URL` environment variable in Heroku to the Netlify URL.

This will allow the Heroku app to link to the Netlify URL correctly.

For example:

```
heroku config:set FRONTEND_URL=https://mystifying-ardinghelli-30e1a3.netlify.app/
```