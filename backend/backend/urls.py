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
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView


urlpatterns = [
    path(
        "api/swagger-ui/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": ""},
        ),
        name="swagger-ui",
    ),
    path("", include("apps.blog.urls")),
    path("api/drf/fbv/", include("apps.blog.drf_fbv_urls")),
    path("api/drf/cbv/", include("apps.blog.drf_cbv_urls")),
    path("api/", include("apps.accounts.drf_fbv_urls")),
    path("cbv/", include("apps.blog.cbv_urls")),
    path("", include("apps.accounts.urls")),
    path("my-admin-portal/", admin.site.urls),
    path("", RedirectView.as_view(url="/posts")),
    path(
        "graphql/",
        csrf_exempt(GraphQLView.as_view(graphiql=settings.DEBUG)),
        name="graphql",
    ),
]

if settings.DEBUG:  # pragma: no cover
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))] + static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT,
    )

    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]
