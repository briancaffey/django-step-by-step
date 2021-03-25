import factory

from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

from apps.blog.models import Post


User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User


# Another, different, factory for the same object
class PostFactory(DjangoModelFactory):
    class Meta:
        model = Post

    # title = factory.Faker('sentence', nb_words=4)
    body = factory.Faker("text")
