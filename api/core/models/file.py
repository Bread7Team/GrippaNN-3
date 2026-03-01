from django.db import models

class File(models.Model):
    """Файл (Скелет)."""
    # TODO: Добавить поля (employee, title, file, uploaded_at, deleted_at)
    class Meta:
        db_table = 'files'
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы'
