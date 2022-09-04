# URLs for GCBVs
from django.urls import path
from apps.blog.views.class_based_views import (
    PostListView,
    PostDetailView,
    PostCreateView,
    PostDeleteView,
    PostUpdateView,
)

urlpatterns = [
    path("posts/new", PostCreateView.as_view(), name="post-create-cbv"),
    path("posts/<str:pk>/edit", PostUpdateView.as_view(), name="post-update-cbv"),
    path(
        "posts/<str:pk>/delete",
        PostDeleteView.as_view(),
        name="post-delete-cbv",
    ),
    path("posts", PostListView.as_view(), name="post-list-cbv"),
    path("posts/<str:pk>", PostDetailView.as_view(), name="post-detail-cbv"),
]
