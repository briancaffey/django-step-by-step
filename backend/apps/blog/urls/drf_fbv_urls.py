# URLs for DRF FBVs
from django.urls import path

from apps.blog.views.drf_fbv_views import (
    get_post,
    list_posts,
    create_post,
    update_post,
    delete_post,
    like_post,
)

urlpatterns = [
    # create
    path("posts/new/", create_post, name="drf-fbv-create-post"),
    # update
    path("posts/<int:pk>/update/", update_post, name="drf-fbv-update-post"),
    # read (detail)
    path("posts/<int:pk>/", get_post, name="drf-fbv-get-post"),
    # read (list)
    path("posts/", list_posts, name="drf-fbv-list-posts"),
    # delete
    path("posts/<int:pk>/delete/", delete_post, name="drf-fbv-delete-post"),
    # like post
    path("posts/<int:pk>/like/", like_post, name="drf-fbv-like-post"),
]
