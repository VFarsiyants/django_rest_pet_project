import json

from django.conf import settings
from django.core.management import BaseCommand

from authapp.models import User


def load_test_users(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', 'r', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        test_users = load_test_users('test_users')
        User.objects.all().delete()
        for user in test_users:
            User.objects.create_user(**user)

        User.objects.create_superuser(
            username='django',
            first_name='Vasiliy',
            last_name='Pupkin',
            email='django@gb.local',
            password='geekbrains'
        )
