from django.urls import path

from apps.blog.views import views

# url patterns for post CRUD (create, read, update, delete)
urlpatterns = [
    # api endpoint for liking a post
    path("api/posts/<str:id>/like", views.like_post, name="like-post"),
    # create
    path("posts/new", views.new_post, name="new-post"),
    # read (paginated list)
    path("posts", views.posts, name="list-posts"),
    # update
    path("posts/<str:id>/edit", views.edit_post, name="update-post"),
    # delete
    path("posts/<str:id>/delete", views.delete_post, name="delete-post"),
    # read (detail)
    path("posts/<str:id>", views.post, name="post"),
]
