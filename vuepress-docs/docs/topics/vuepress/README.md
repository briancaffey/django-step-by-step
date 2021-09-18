# A guide to this VuePress site

This documentation site is built using

- [VuePress v2](https://v2.vuepress.vuejs.org/)
- TypeScript
- Markdown

This page will offer guidance on how to build and deploy this documentation site.

## Starting the application in local development mode

To start working on the development of this project, run the following command from the Makefile:

```
make vuepress-dev
```

This will start the documentation on `http://localhost:8089`. Code changes will be reflected in the local site when files are added or saved.

## Adding new pages

To add a new page, add a new folder under the `docs` directory and then add a `README.md` file in the new directory.

## Deploying the site to GitHub pages

This documentation site is currently hosted on `https://briancaffey.github.io/django-step-by-step/`. The `django-step-by-step` repo is configured with GitHub pages. Files in the `/docs` folder on the `master` branch of the project will be served on [https://briancaffey.github.io/django-step-by-step/](https://briancaffey.github.io/django-step-by-step/).

Deploying the site to GitHub pages requires doing the following:

- building the VuePress site
- moving the build artifacts to the `/docs` folder
- committing and pushing the changes with the new build artifacts to the `master` branch of the GitHub repo.

Once the local changes are ready to be deployed, run the following commands:

```
make vuepress-build-docs
```

This will build the site and copy the files to the `/docs` directory.

Next, checkout the `master` branch and push the changes.

## Images

Images can be added to Markdown files, but they must use the following VuePress utility:

```
<img :src="$withBase('/path/to/image.png')" alt="ublog image">
```

This will ensure that the image links will not break if the base URL value changes.
