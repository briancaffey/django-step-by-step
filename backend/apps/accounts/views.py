from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site


from django.contrib import messages
from django.contrib.auth import views as auth_views

from apps.accounts.forms import CustomUserRegistrationForm
from apps.accounts.tasks import send_confirmation_email

# from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model, login

# Create your views here.

from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views.generic import View

from apps.accounts.tokens import account_activation_token


User = get_user_model()


class ActivateAccount(View):
    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(
            user, token
        ):
            user.is_active = True
            user.save()
            login(request, user)
            messages.add_message(
                request,
                messages.SUCCESS,
                "Your email has been confirmed.",
                extra_tags="alert alert-success",
            )
            return HttpResponseRedirect("/posts")
        else:
            messages.add_message(
                request,
                messages.WARNING,
                ("The confirmation link was invalid."),
                extra_tags="alert alert-warning",
            )
            messages.warning(
                request,
                ("The confirmation link was invalid."),
            )
            return HttpResponseRedirect("/posts")


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


def register(request):

    if request.user.is_authenticated:
        return HttpResponseRedirect("/posts")

    form = CustomUserRegistrationForm(request.POST)
    if form.is_valid():
        user = form.save(commit=False)
        user.is_active = False
        user.save()
        # logger.info("")
        # this should be false if user hasn't confirmed email
        # print(form.cleaned_data)
        # username = form.cleaned_data.get("email")
        # password = form.cleaned_data.get("password1")
        # user = authenticate(username=username, password=password)
        # print(user)
        # login(
        #     request,
        #     user,
        #     backend="django.contrib.auth.backends.ModelBackend",
        # )
        current_site = get_current_site(request)

        # user.email_user(subject, message)
        # this celery task will send the confirmation email
        send_confirmation_email.apply_async(
            kwargs={
                "user_id": user.id,
                "domain": current_site.domain,
            }
        )

        # this will tell the user to check their email
        messages.add_message(
            request,
            messages.SUCCESS,
            "Thank you for signing up! Please confirm your email address!",
            extra_tags="alert alert-success",
        )
        return HttpResponseRedirect("/posts")

    return render(request, "register.html", {"form": form})
