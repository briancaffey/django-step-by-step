---
next: /guide/step-by-step
prev: /topics/jwt-authentication
---

# A guide to this VuePress site

[[toc]]

This documentation site is built using

- [VuePress v2](https://v2.vuepress.vuejs.org/)
- TypeScript
- Markdown

This page shows how to build and deploy the μblog documentation site.

## Starting the application in local development mode

To start working on the development of this project, run the following command from the Makefile:

```
make vuepress-dev
```

This will start the documentation on `http://localhost:8089`. Code changes will be reflected in the local site when files are added or saved.

## How to add new pages

To add a new page, add a new folder under the `docs` directory and then add a `README.md` file in the new directory. Next, add a corresponding for all supported languages in the `docs/.vuepress/configs/{en,zh}.ts` files.

## How to deploy this site to GitHub pages

This documentation site is currently hosted on [`https://briancaffey.github.io/django-step-by-step/`](https://briancaffey.github.io/django-step-by-step/). The `django-step-by-step` repo is configured to use GitHub pages. The documentation site is deployed using a GitHub Action from the GitHub Actions marketplace called [peaceiris/actions-gh-pages@v3](https://github.com/peaceiris/actions-gh-pages).

```yml
name: github pages

on:
  push:
    branches:
      - dev
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: cd vuepress-docs && yarn
      - run: cd vuepress-docs && yarn docs:build

      - name: deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./vuepress-docs/docs/.vuepress/dist
          publish_branch: master
```

You don't need to set `GITHUB_TOKEN` anywhere, this secret is available by default.

This is how GitHub pages are configured under `Settings > Pages` in Github:

<img :src="$withBase('/images/screenshots/gh-pages-settings.png')" alt="github pages settings image">

When changes are pushed to the `dev` branch, the Vuepress sites are built and the committed to the `master` branch serves the GitHub Pages site. The `master` branch of the repo will only contain the files needed for the documentation site. No other files will be committed on the `master` branch.

## How to add images to pages in the documentation site

Images can be added to Markdown files, but they must use the following VuePress utility:

```
<img :src="$withBase('/path/to/image.png')" alt="ublog image">
```

This will ensure that the image links will not break if the base URL value changes.
