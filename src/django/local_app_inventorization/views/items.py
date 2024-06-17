import json

from django.db.models import F
from django.http import JsonResponse
from django.views import View

from local_app_inventorization.models import Item

from .params import SearchParams


class GetItems(View):
    async def get(self, request, *args, **kwargs):
        params = SearchParams.from_get_params(request.GET)
        filters = {'name__istartswith': params.query} if params.query is not None else {}
        items = Item.objects.filter(**filters).select_related('group')[params.start:params.end]

        return JsonResponse([
            i.to_full_dict()
            async for i in items
        ], safe=False)


class GetItem(View):
    async def get(self, request, item_id, *args, **kwargs):
        item = await self._get_item(item_id)

        return JsonResponse({
            'item': item.to_full_dict() if item else None,
        })

    async def _get_item(self, item_id):
        try:
            return await Item.objects.select_related('group').aget(id=item_id)
        except Item.DoesNotExist:
            return None


class GetNeededItems(View):
    async def get(self, request, *args, **kwargs):
        items = await self._get_items()

        return JsonResponse([
            i.to_full_dict()
            for i in items
        ], safe=False)

    async def _get_items(self):
        items = Item.objects.filter(needed_count__gt=F('count')).select_related('group')
        return [i async for i in items]


class CreateItem(View):
    async def post(self, request, parent_group_id, *args, **kwargs):
        data = json.loads(request.body)
        name = data.get('name')
        count = data.get('count', 0)
        needed_count = data.get('needed_count', 0)

        if name is None:
            return JsonResponse({
                'name': 'Missed value.',
            }, status=400)

        item = await Item.objects.acreate(
            name=name,
            count=count,
            needed_count=needed_count,
            group_id=parent_group_id,
        )

        return JsonResponse(item.to_dict())


class UpdateItem(View):
    async def post(self, request, item_id, *args, **kwargs):
        try:
            item = await Item.objects.aget(id=item_id)
        except Item.DoesNotExist:
            return JsonResponse({
                'id': 'Wrong value.',
            }, status=400)

        data = json.loads(request.body)

        if 'name' in data:
            item.name = data['name']
        if 'count' in data:
            item.count = data['count']
        if 'needed_count' in data:
            item.needed_count = data['needed_count']
        if 'parent_group_id' in data:
            item.group_id = data['parent_group_id']
        await item.asave()

        return JsonResponse(item.to_dict())
