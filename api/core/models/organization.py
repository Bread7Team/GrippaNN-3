from django.db import models

class Organization(models.Model):
    """Организация (Скелет)."""
    # TODO: Добавить поля (name, comment, deleted_at)
    class Meta:
        db_table = 'organizations'
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'
