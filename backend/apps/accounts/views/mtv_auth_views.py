from django.http import HttpResponseRedirect
from django.shortcuts import render, reverse
from django.contrib.sites.shortcuts import get_current_site

from django.contrib import messages
from django.contrib.auth import views as auth_views
from django.contrib.auth import get_user_model, login
from django.contrib.auth.decorators import login_required
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.views.generic import View

from apps.accounts.forms import CustomUserRegistrationForm
from apps.accounts.tasks import send_confirmation_email
from apps.accounts.tokens import account_activation_token
from apps.blog.models import Post, PostLike
from apps.core import constants as c

User = get_user_model()


class ActivateAccount(View):
    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            login(
                request,
                user,
                backend="django.contrib.auth.backends.ModelBackend",
            )
            messages.add_message(
                request,
                messages.SUCCESS,
                "Your email has been confirmed.",
                extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
            )
            return HttpResponseRedirect(reverse("list-posts"))
        else:
            messages.add_message(
                request,
                messages.WARNING,
                ("The confirmation link was invalid."),
                extra_tags=c.BOOTSTRAP_ALERT_WARNING,
            )

            return HttpResponseRedirect(reverse("list-posts"))


class CustomLogoutView(auth_views.LogoutView):

    """
    https://stackoverflow.com/questions/11393929/django-message-when-logout
    """

    def get_next_page(self):
        next_page = super(CustomLogoutView, self).get_next_page()
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "You successfully logged out!",
            extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
        )
        return next_page


def register(request):

    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("list-posts"))

    form = CustomUserRegistrationForm()

    if request.method == "POST":

        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

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
                extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
            )
            return HttpResponseRedirect(reverse("list-posts"))

    return render(request, "register.html", {"form": form})


@login_required
def profile_view(request):
    posts = Post.objects.filter(created_by=request.user)
    liked_posts = PostLike.objects.prefetch_related("post").filter(
        liked_by=request.user
    )
    post_likes = PostLike.objects.filter(post__created_by=request.user)
    context = {
        "posts": posts,
        "liked_posts": liked_posts,
        "post_likes": post_likes,
    }
    return render(request, "profile.html", context)
