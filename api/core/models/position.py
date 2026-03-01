from django.db import models

class Position(models.Model):
    """Должность (Скелет)."""
    # TODO: Добавить поля (name, comment, deleted_at)
    class Meta:
        db_table = 'positions'
        verbose_name = 'Должность'
        verbose_name_plural = 'Должности'
