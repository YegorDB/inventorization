from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100)
    group = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='subgroups',
        blank=True,
        null=True
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'group_id': self.group_id,
        }

    def to_full_dict(self):
        result = self.to_dict()
        del result['group_id']
        result['group'] = self.group.to_dict() if self.group else None
        return result


class Item(models.Model):
    name = models.CharField(max_length=100)
    count = models.IntegerField()
    needed_count = models.IntegerField()
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='items',
        blank=False,
        null=False
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count,
            'needed_count': self.needed_count,
            'group_id': self.group_id,
        }

    def to_full_dict(self):
        result = self.to_dict()
        del result['group_id']
        result['group'] = self.group.to_dict()
        return result
