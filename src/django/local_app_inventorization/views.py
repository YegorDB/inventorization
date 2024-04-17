from asgiref.sync import sync_to_async

from django.db import connection
from django.http import JsonResponse
from django.views import View


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
