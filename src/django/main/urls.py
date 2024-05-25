from django.contrib import admin
from django.urls import include, path

from local_app_inventorization.views import (
    GetGroups, GetRootGroups, GetGroup, GetGroupParents,
    GetItem, GetNeededItems,
)
from local_app_users.views import AuthCheck, AuthLogin


api_urlpatterns = ([
    path('1.0/auth/check/', AuthCheck.as_view(), name='auth-check'),
    path('1.0/auth/login/', AuthLogin.as_view(), name='auth-login'),
    path('1.0/groups/', GetGroups.as_view(), name='get-groups'),
    path('1.0/groups/root/', GetRootGroups.as_view(), name='get-root-groups'),
    path('1.0/groups/<int:group_id>/', GetGroup.as_view(), name='get-group'),
    path('1.0/groups/<int:group_id>/parents/', GetGroupParents.as_view(), name='get-group-parents'),
    path('1.0/items/<int:item_id>/', GetItem.as_view(), name='get-item'),
    path('1.0/needed-items/', GetNeededItems.as_view(), name='needed-items'),
], 'api')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
]
