import factory

from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

from apps.blog.models import Post


User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    # email = factory.Faker("email")


# Another, different, factory for the same object
class PostFactory(DjangoModelFactory):
    class Meta:
        model = Post

    body = factory.Faker("text")
