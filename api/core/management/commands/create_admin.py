from django.core.management.base import BaseCommand
from core.models import User


class Command(BaseCommand):
    help = 'Создание администратора по умолчанию'

    def handle(self, *args, **options):
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Пользователь admin уже существует.'))
            return

        User.objects.create_superuser(
            username='admin',
            password='admin123',
            first_name='Администратор',
            last_name='Системы',
            role='admin',
        )
        self.stdout.write(self.style.SUCCESS('Администратор создан: admin / admin123'))
