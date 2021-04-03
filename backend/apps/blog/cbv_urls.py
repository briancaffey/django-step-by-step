# URLs for GCBVs
from django.urls import path
from apps.blog.class_based_views import (
    PostListView,
    PostDetailView,
    PostCreateView,
)

urlpatterns = [
    path("posts/new", PostCreateView.as_view(), name="post-create-cbv"),
    path("posts", PostListView.as_view(), name="post-list-cbv"),
    path("posts/<str:pk>", PostDetailView.as_view(), name="post-detail-cbv"),
]
