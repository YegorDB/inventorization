import asyncio

from asgiref.sync import sync_to_async

from django.core.exceptions import ObjectDoesNotExist
from django.db import connection
from django.db.models import F
from django.http import JsonResponse
from django.views import View

from local_app_inventorization.models import Group, Item


class GetRootGroups(View):
    async def get(self, request, *args, **kwargs):
        groups = Group.objects.filter(group=None)

        return JsonResponse([
            g.to_dict()
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
        except ObjectDoesNotExist:
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


class GetItem(View):
    async def get(self, request, item_id, *args, **kwargs):
        item = await self._get_item(item_id)

        return JsonResponse({
            'item': item.to_full_dict() if item else None,
        })

    async def _get_item(self, item_id):
        try:
            return await Item.objects.select_related('group').aget(id=item_id)
        except ObjectDoesNotExist:
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
