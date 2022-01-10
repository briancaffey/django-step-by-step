from django.urls import include, path
from rest_framework import routers

from apps.blog.views.drf_cbv_views import PostViewSet


router = routers.DefaultRouter()
router.register(r"posts", PostViewSet, basename="drf-cbv-posts")

# app_name = 'blog'

urlpatterns = [
    path("", include(router.urls)),
]
