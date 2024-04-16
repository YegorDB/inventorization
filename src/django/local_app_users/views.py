from django.http import JsonResponse
from django.views import View


class AuthCheck(View):
    async def get(self, request, *args, **kwargs):
        user = await request.auser()
        return JsonResponse({
            'success': user.is_authenticated,
        })
