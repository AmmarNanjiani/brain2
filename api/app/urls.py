"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from app.views import index
from django.contrib.staticfiles.urls import staticfiles_urlpatterns # DEV only
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title = 'brain2 API',
        default_version = 'v1',
        description = 'API to access my note data on books.',
    ),
    public = True,
    permission_classes = (permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('brain2_api/', include('app.brain2_api.urls')),
    path('', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# DEV only
urlpatterns += staticfiles_urlpatterns()