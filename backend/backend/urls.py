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

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # health check, exception, email-admins
    path("api/", include("apps.core.urls.api_urls")),
    # index template view
    path("mtv/", include("apps.core.urls.mtv_urls")),
    # swagger docs
    path(
        "api/swagger-ui/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": ""},
        ),
        name="swagger-ui",
    ),
    # function-based views for blog
    path("mtv/fbv/", include("apps.blog.urls.fbv_urls")),
    # class-based views for mtv
    path("mtv/cbv/", include("apps.blog.urls.cbv_urls")),
    # simple JWT routes
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # api views for blog app
    path("api/drf/fbv/", include("apps.blog.urls.drf_fbv_urls")),
    path("api/drf/cbv/", include("apps.blog.urls.drf_cbv_urls")),
    # auth urls for api
    path("api/", include("apps.accounts.urls.drf_fbv_urls")),
    # auth urls for api
    path("api/", include("apps.accounts.urls.auth.api_urls")),
    # auth urls for mtv
    path("mtv/", include("apps.accounts.urls.auth.mtv_urls")),
    # django admin
    path("admin/", admin.site.urls),
    # graphql endpoint
    path(
        "graphql/",
        csrf_exempt(GraphQLView.as_view(graphiql=True)),
        name="graphql",
    ),
    path("api/chat/", include("apps.chat.urls")),
]

# static files
urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT,
)

# urls only exposed in debug mode
if settings.DEBUG:  # pragma: no cover
    import debug_toolbar

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]

    # django-silk
    urlpatterns += [path("api/silk/", include("silk.urls", namespace="silk"))]
