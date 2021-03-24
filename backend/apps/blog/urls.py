from django.urls import path

from apps.blog import views

urlpatterns = [
    path("posts/", views.posts),
]
