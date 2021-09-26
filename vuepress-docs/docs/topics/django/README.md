---
next: /topics/quasar
prev: /topics/twelve-factor-app
---

# About the Django Application

The Django application is the main component of the backend and handles the following:

- Return responses for web requests (using gunicorn)
- Process asynchronous tasks (using Celery)

## Data Model

The Django project is a simple blogging application. The main data model is a `Post` model that contains a few different types of fields:

- `body`: The title of the post, a `CharField`
- `image`: An optional image associated with the post, an `ImageField`
- `likes`: ManyToMany field to `PostLike` model (through model)
- `created_on`: `DateTimeField` (inherited from `BaseModel`)
- `modified_on`: `DateTimeField` (inherited from `BaseModel`)
- `created_by`: `ForeignKey` to `CustomUser` model (inherited from `BaseModel`)

### Core App
- RequestLog

### Blog App
- Blog Post
- Like

## Views

Views are where most of the work of the request/response cycle takes place. In Django, views are functions or classes responsible for handling requests and returning responses.

This application uses several different types of views:

- function-based views
- class-based views

The function based views are fairly easy to read and understand and are find for most use cases. Class-based views can be used to achieve the same functionality as function-based views but require less code. Customizing the behavior of class-based views requires overwriting methods of view class being used.

## Custom User Model

Django has a default model that provides a user model. Instead of using this, we can subclass the `AbstractBaseUser` model to keep most of the same behavior, but also have a more flexible model that will allow us to add custom fields.

See [Customizing authentication in Django](https://docs.djangoproject.com/en/3.2/topics/auth/customizing/) for more information on customizing authentication in Django.

## Poetry for managing Django project dependencies

Poetry is used as a dependency manager for Django projects. First we can have a look at how poetry works at a high level. We can list all of the project's python dependencies in `pyproject.toml`, including development dependencies (such as `pytest` for example) and product-only dependencies (such as the `Django` package). This `pyproject.toml` file is then used to create a `poetry.lock` file that contains the exact version of each dependency.


## GraphQL with Graphene

## Django REST Framework

Django REST Framework (DRF) is used to build the REST API for μblog. The REST API is implemented in two different ways:

- using function-based views
- using class-based views

### Function based views

Django REST Framework allows you to use functions to handle API requests. The functions must be decorated with the `@api_view` decorator, and other decorators can be used to customize view behavior. One function is used per CRUD operation on our blog post model. There is also a function used to handle requests made when an authenticated user clicks the `like` button.

### ModelViewSet

Similar to Django, DRF allows you to express views with both functions and classes. There are multiple approaches that can be used with class-based. `ModelViewSet` is used in this sample application. The `ModelViewSet` class is used to create a view that can be used to create, retrieve, update, and delete a model instance.

### `@action` decorator

For the like button functionality, the `@action` decorator is used to create a custom action on blog posts.

### `get_queryset` method

The `get_queryset` method is used to efficiently fetch the number of likes for each blog post, and to a boolean property that indicates that the current user (if there is one) has liked a given post.

## OpenAPI Documentation

OpenAPI is used to build documentation for the API built with Django REST Framework.

## JWT Authentication and HttpOnly Cookies

How to do authentication in Django REST Framework project is sometimes a heated debate over web standards and security best practices. This project implements one of the most popular packages for authentication in Django REST Framework, `djangorestframework-simplejwt` with some modifications.

The modifications involve sub-classing certain classes used for authentication so that the `refresh_token` can be stored in an `HttpOnly` cookie. This behavior is not provided by default, but it is important to do this so that credentials do not need to be stored in the browser's `localStorage` or in cookies that can be accessed by JavaScript.

The access token is retrieved from the body of an authentication endpoint (where the username and password are supplied) and is then attached to each request that the browser makes to the API (using axios). The access token is stored in memory in a Vue.js `ref` object. The access token is used to authenticate requests on the server without having to make extra database queries.

The payload of the JWT access token is not used to retrieve any information. Instead, a separate authenticated request is made to fetch information on the user (user profile information).

When the user authenticates with a username and password and gets the `access` token as described above, there is no `refresh` token in the response body. Instead, the `refresh` token is set in an `HttpOnly` cookie on the server that is then set on the web browser client. The refresh cookie is used to refresh the short-lived `access` token.

See `auth_views.py` for the code that customizes the `djangorestframework-simplejwt` package behavior.

### Domain name limitations

An important implication of this authentication setup is that the backend API and frontend web client must be located on the same domain or some common subdomain. This is because an API request to `abc.com` can not set an `HttpOnly` cookie on a frontend that is `xyz.com`.

If you are storing both the `access` and `refresh` tokens in `localStorage`, then you can have your frontend and backend hosted on separate domains, such us `my-backend-app.herokuapp.com` and `my-frontend-app.netlify.app`.

