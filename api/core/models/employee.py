from django.db import models

class Employee(models.Model):
    """Сотрудник (Скелет)."""
    # TODO: Добавить поля (last_name, first_name, middle_name, passport, address, deleted_at)
    class Meta:
        db_table = 'employees'
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'
