import asyncio
import json

from asgiref.sync import sync_to_async
from dataclasses import dataclass

from django.db import connection
from django.db.models import F
from django.http import JsonResponse
from django.views import View

from local_app_inventorization.models import Group, Item


@dataclass
class SearchParams:
    query: str | None
    start: int
    end: int | None

    @classmethod
    def from_get_params(cls, get_params):
        query = get_params.get('query', None)
        offset = get_params.get('offset', '0')
        start = int(offset) if offset.isnumeric() else 0
        limit = get_params.get('limit', '10')
        end = int(limit) + start if limit.isnumeric() else None

        return cls(
            query=query,
            start=start,
            end=end,
        )


class GetRootGroups(View):
    async def get(self, request, *args, **kwargs):
        params = SearchParams.from_get_params(request.GET)
        groups = Group.objects.filter(group=None)[params.start:params.end]

        return JsonResponse([
            g.to_dict()
            async for g in groups
        ], safe=False)


class GetGroups(View):
    async def get(self, request, *args, **kwargs):
        params = SearchParams.from_get_params(request.GET)
        filters = {'name__istartswith': params.query} if params.query is not None else {}
        groups = Group.objects.filter(**filters).select_related('group')[params.start:params.end]

        return JsonResponse([
            g.to_full_dict()
            async for g in groups
        ], safe=False)


class GetGroup(View):
    async def get(self, request, group_id, *args, **kwargs):
        group, groups, items = await asyncio.gather(
            self._get_group(group_id),
            self._get_groups(group_id),
            self._get_items(group_id),
        )

        return JsonResponse({
            'group': group.to_full_dict() if group else None,
            'groups': [g.to_dict() for g in groups],
            'items': [i.to_dict() for i in items]
        })

    async def _get_group(self, group_id):
        try:
            return await Group.objects.select_related('group').aget(id=group_id)
        except Group.DoesNotExist:
            return None

    async def _get_groups(self, group_id):
        groups = Group.objects.filter(group_id=group_id)
        return [g async for g in groups]

    async def _get_items(self, group_id):
        items = Item.objects.filter(group_id=group_id)
        return [i async for i in items]


class GetGroupParents(View):
    async def get(self, request, group_id, *args, **kwargs):
        rows = await self._get_groups_rows(group_id)

        return JsonResponse([
            {
                'id': row_id,
                'name': name,
                'group_id': group_id,
            }
            for row_id, name, group_id in rows
        ], safe=False)

    @sync_to_async
    def _get_groups_rows(self, group_id):
        sql = '''
            WITH RECURSIVE groups(id, name) AS (
                SELECT id, name, group_id
                FROM local_app_inventorization_group
                WHERE id = %s

                UNION ALL

                SELECT g.id, g.name, g.group_id
                FROM groups gs, local_app_inventorization_group g
                WHERE gs.group_id = g.id
            )
            SELECT *
            FROM groups;
        '''

        with connection.cursor() as cursor:
            cursor.execute(sql, [group_id])
            rows = cursor.fetchall()

        return rows


class CreateGroup(View):
    async def post(self, request, parent_group_id, *args, **kwargs):
        data = json.loads(request.body)
        name = data.get('name')

        if name is None:
            return JsonResponse({
                'name': 'Missed value.',
            }, status=400)

        group = await Group.objects.acreate(
            name=name,
            group_id=parent_group_id,
        )

        return JsonResponse(group.to_dict())


class UpdateGroup(View):
    async def post(self, request, group_id, *args, **kwargs):
        try:
            group = await Group.objects.aget(id=group_id)
        except Group.DoesNotExist:
            return JsonResponse({
                'id': 'Wrong value.',
            }, status=400)

        data = json.loads(request.body)

        if 'name' in data:
            group.name = data['name']
        if 'parent_group_id' in data:
            group.group_id = data['parent_group_id']
        await group.asave()

        return JsonResponse(group.to_dict())


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
