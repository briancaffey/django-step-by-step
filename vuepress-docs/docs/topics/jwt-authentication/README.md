# Authentication

Authentication is an important part of any application. With a Django project that uses a decoupled frontend application such as μblog, authentication can be done in several different ways with different trade-offs.

[[toc]]

## Different ways to do authentication

Here are some ways that you can implement authentication:

- Use Django's built-in session authentication
- Use JSON Web Tokens (JWT) stored in localStorage
- Use JSON Web Tokens stored in memory/HttpOnly cookies
- Use Token Authentication from Django REST Framework
- Using third-party packages

### Built-in session authentication

Using Django session authentication is what the Django REST Framework documentation recommends for user authentication. Some important points:

- You don't need to use any Django template views in order to use this method of authentication.
- This method of authentication requires no additional packages to be installed in our application
- Using session auth is secure and easy to implement
- Using session authentication is not stateless and each request must make a database query to check if the user is authenticated
- Logging users out is straightforward
- The `sessionid` cookie is set as an `HttpOnly` cookie
- The backend and frontend must use the same domain and subdomain

### Using JSON Web Tokens (JWT) in localStorage

This method of authentication is very flexible and easy to implement and seems to be used very widely. However, there are some important concerns that need to be considered. Here are the import points regarding JSON Web Token authentication:

- Storing authentication data is `localStorage` is not a best practice
- You can easily authenticate requests where the backend and frontend are on different hosts. Some examples of `backend` / `frontend` configurations that you can use with JWT authentication include:
    - `my-api.herokuapp.com` / `my-frontend.netlify.app`
    - `api.mydomain.com` / `app.mydomain.com`
    - `localhost:8000` / `localhost:8080`
- Using JWT authentication typically involves using a third-party package such as [`djangorestframework-simplejwt`](https://github.com/jazzband/djangorestframework-simplejwt)
- If malicious JavaScript can run on the client, then an attacker could steal the JWT `access` token and start making authenticated requests.
- If someone steals the tokens from your device (for example if someone copied the `access` and `refresh` from the browser's `localStorage` when you are not at your device), then an attacker could use the stolen tokens to make authenticated requests, even if you log out. Logging only deletes the `access` and `refresh` tokens from your browser's `localStorage`.

### Use JSON Web Tokens stored in memory/HttpOnly cookies

This methods of authentication combines some of the features of JWT and session authentication.

- It takes some ideas and code from [this GitHub issue](https://github.com/jazzband/djangorestframework-simplejwt/issues/71)
- It generally follows the advice from [this article](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
- It stores the `access` token in memory on the client
- It sets the `refresh` token in an HttpOnly cookie on the client
- Logout can be done by deleting the `refresh` token

### Token Authentication from Django REST Framework

Token Authentication from the Django REST Framework is pretty straightforward. You can allow users to request an API token that they can use to authenticate requests. See [https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication](https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication) for more information.

## Diagram of JWT authentication with HttpOnly cookies

Here is an overview of what the JWT authentication process looks like when using HttpOnly cookies:

<img :src="$withBase('/diagrams/jwt-authentication.png')" alt="jwt authentication">
