from django.db import models

class HrOperation(models.Model):
    """Кадровая операция (Скелет)."""
    # TODO: Добавить поля (employee, type, department, position, salary, date)
    class Meta:
        db_table = 'hr_operations'
        verbose_name = 'Кадровая операция'
        verbose_name_plural = 'Кадровые операции'

class ChangeHistory(models.Model):
    """История изменений (Скелет)."""
    # TODO: Добавить поля (date, user, object_type, object_id, changes)
    class Meta:
        db_table = 'change_history'
        verbose_name = 'Запись истории'
        verbose_name_plural = 'История изменений'
