import json

from django.contrib.auth import aauthenticate, alogin
from django.http import JsonResponse
from django.views import View


class AuthCheck(View):
    async def get(self, request, *args, **kwargs):
        user = await request.auser()
        return JsonResponse({
            'success': user.is_authenticated,
        })


class AuthLogin(View):
    async def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        user = await aauthenticate(
            request=request,
            username=data.get('username', ''),
            password=data.get('password', ''),
        )

        success = False
        if user is not None:
            await alogin(request, user)
            success = True

        return JsonResponse({
            'success': success,
        })
