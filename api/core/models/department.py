from django.db import models

class Department(models.Model):
    """Отдел (Скелет)."""
    # TODO: Добавить поля (organization, name, parent, comment, deleted_at)
    class Meta:
        db_table = 'departments'
        verbose_name = 'Отдел'
        verbose_name_plural = 'Отделы'
