from django.contrib import admin
from django.urls import include, path

from local_app_users.views import AuthCheck


api_urlpatterns = ([
    path('1.0/auth/check/', AuthCheck.as_view(), name='auth-check'),
], 'api')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
]
