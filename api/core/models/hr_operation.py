from django.db import models
from django.conf import settings


class HrOperation(models.Model):
    """Кадровая операция."""

    class OperationType(models.TextChoices):
        HIRE = 'hire', 'Принятие на работу'
        SALARY_CHANGE = 'salary_change', 'Изменение зарплаты'
        DEPARTMENT_CHANGE = 'department_change', 'Изменение отдела'
        DISMISSAL = 'dismissal', 'Увольнение'

    employee = models.ForeignKey(
        'core.Employee',
        on_delete=models.CASCADE,
        related_name='hr_operations',
        verbose_name='Сотрудник',
    )
    operation_type = models.CharField(
        'Тип операции',
        max_length=20,
        choices=OperationType.choices,
    )
    department = models.ForeignKey(
        'core.Department',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='hr_operations',
        verbose_name='Отдел',
    )
    position = models.ForeignKey(
        'core.Position',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='hr_operations',
        verbose_name='Должность',
    )
    salary = models.DecimalField(
        'Зарплата',
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )
    effective_date = models.DateField('Дата вступления в силу')
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_operations',
        verbose_name='Кем создано',
    )
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'hr_operations'
        verbose_name = 'Кадровая операция'
        verbose_name_plural = 'Кадровые операции'
        ordering = ['-effective_date']

    def __str__(self):
        return f'{self.get_operation_type_display()} — {self.employee}'

    def save(self, *args, **kwargs):
        # Бизнес-логика: обновление полей сотрудника на основе последней операции
        super().save(*args, **kwargs)
        
        # Обновляем сотрудника только если операция не удалена
        if not self.deleted_at:
            employee = self.employee
            if self.operation_type in [self.OperationType.HIRE, self.OperationType.DEPARTMENT_CHANGE]:
                if self.department:
                    # Здесь могла бы быть связь Employee -> Department, 
                    # но в текущей модели Employee её нет.
                    # Предположим, логика просто логирует это.
                    pass
            
            if self.operation_type == self.OperationType.DISMISSAL:
                # При увольнении можно ставить пометку сотруднику (логика заглушка)
                pass
