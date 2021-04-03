"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import debug_toolbar
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView

urlpatterns = [
    path("", include("apps.blog.urls")),
    path("cbv/", include("apps.blog.cbv_urls")),
    path("", include("apps.accounts.urls")),
    path("my-admin-portal/", admin.site.urls),
    path("", RedirectView.as_view(url="/posts")),
]

if settings.DEBUG:  # pragma: no cover
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))] + static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT,
    )

    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]
