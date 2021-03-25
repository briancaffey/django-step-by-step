from django.shortcuts import render  # noqa


from django.contrib import messages
from django.contrib.auth import views as auth_views

# Create your views here.


class CustomLogoutView(auth_views.LogoutView):

    """
    https://stackoverflow.com/questions/11393929/django-message-when-logout
    """

    def get_next_page(self):
        next_page = super(CustomLogoutView, self).get_next_page()
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "You successfully log out!",
            extra_tags="alert alert-success",
        )
        return next_page
