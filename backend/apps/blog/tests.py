import pytest

from apps.blog.factory import PostFactory
from apps.blog.models import Post


@pytest.mark.django_db(transaction=True)
def test_post():

    POST_TEXT = "This is a test post."

    # this saves the post in the database
    post = PostFactory(body=POST_TEXT)

    # this queries the database for the number of posts
    post_count = Post.objects.count()

    # checks to see if the number of posts queried is 1
    assert post_count == 1

    # checks that the post has the body that we assigned to it in the test
    assert post.body == POST_TEXT
