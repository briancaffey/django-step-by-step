from django.urls import path

from apps.blog import views

# url patterns for post CRUD (create, read, update, delete)
urlpatterns = [
    # create
    path("posts/new", views.new_post),
    # read (paginated list)
    path("posts", views.posts),
    # update
    path("posts/<str:id>/edit", views.edit_post),
    # delete
    path("posts/<str:id>/delete", views.delete_post),
    # read (detail)
    path("posts/<str:id>", views.post),
]
