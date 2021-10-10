---
next: /topics/docker-compose
prev: /topics/django
---

# Quasar Setup

[[toc]]

## μblog Application

Here's a screenshot of the μblog front-end application that uses Quasar. Quasar is a framework for building high-performance & high-quality Vue.js apps.

<img :src="$withBase('/images/screenshots/ublog-screenshot.png')" alt="ublog">

## New Quasar Project

To start a new Quasar project, run:

```
quasar create quasar-app
```

Here are the options I have selected:

```
quasar create quasar-app

  ___
 / _ \ _   _  __ _ ___  __ _ _ __
| | | | | | |/ _` / __|/ _` | '__|
| |_| | |_| | (_| \__ \ (_| | |
 \__\_\\__,_|\__,_|___/\__,_|_|



? Project name (internal usage for dev) quasar-app
? Project product name (must start with letter if building mobile apps) Quasar App
? Project description A Quasar Framework app
? Author Brian Caffey <briancaffey2010@gmail.com>
? Pick your CSS preprocessor: SCSS
? Check the features needed for your project:
ESLint (recommended), TypeScript, Vuex, Axios, Vue-i18n
? Pick a component style: Composition
? Pick an ESLint preset: Prettier
? Continue to install project dependencies after the project has been created? (recommended) yarn



  Quasar CLI · Generated "quasar-app".


 [*] Installing project dependencies ...

yarn install v1.22.10
info No lockfile found.
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
warning @quasar/app > webpack-dev-server > sockjs > uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
warning @quasar/app > webpack-dev-server > url > querystring@0.2.0: The
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
warning " > vue-i18n@9.1.6" has unmet peer dependency "vue@^3.0.0".
warning " > vuex@4.0.2" has unmet peer dependency "vue@^3.0.2".
warning " > @babel/eslint-parser@7.14.7" has unmet peer dependency "@babel/core@>=7.11.0".
warning "@typescript-eslint/eslint-plugin > tsutils@3.21.0" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
[5/5] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 34.47s.


 [*] Running eslint --fix to comply with chosen preset rules...


yarn run v1.22.10
$ eslint --ext .js,.ts,.vue ./ --fix
✨  Done in 3.00s.

 [*] Quasar Project initialization finished!

To get started:

  cd quasar-app
  quasar dev

Documentation can be found at: https://quasar.dev

Quasar is relying on donations to evolve. We'd be very grateful if you can
read our manifest on "Why donations are important": https://quasar.dev/why-donate
Donation campaign: https://donate.quasar.dev
Any amount is very welcomed.
If invoices are required, please first contact razvan@quasar.dev

Please give us a star on Github if you appreciate our work:
https://github.com/quasarframework/quasar

Enjoy! - Quasar Team
```

Now you will have a folder in the root of our project call `quasar-app`.

## Quasar Make command

Let's add a Makefile command to the root of the project to start the Quasar project locally:

```
## -- Quasar Targets --

## start quasar project locally
quasar-dev:
    cd quasar-app && quasar dev
```

### Router Mode

In `quasar.conf.js`, set the default router mode:

```ts
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
```

### Set API_URL in quasar.conf.js

```ts
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      env: ctx.dev
        ? {
            API_URL: `http://localhost:8000`,
          }
        : {
            API_URL: `https://${process.env.API_URL}`,
        }
```

### Workbox Settings

If you are building the application in PWA mode, then you will want to configure the following settings in the `quasar.conf.js` file for `workboxOptions`:

```js
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'

      // Add this option
      workboxOptions: {
        navigateFallback: '/index.html',
        navigateFallbackBlacklist: [/[admin,api]+\/.*/]
      }, // only for GenerateSW
```

## Starting work on the existing Quasar project

If you cloned this repo and want to make some changes to the Quasar applications, you will need to run the following commands:

```
npm i -g @quasar/cli
cd quasar-app
yarn
```

Then, from the parent directory, you can run:

```
make quasar-dev
```

## TODO

### Application

- Fix like button on list page

- Fix MainLayout Menu
- Add Route Guards

