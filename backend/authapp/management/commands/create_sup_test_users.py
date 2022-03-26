import json

from django.conf import settings
from django.core.management import BaseCommand
from authapp.models import User
from django.contrib.auth.models import Group, Permission


def load_test_users(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', 'r', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        test_users = load_test_users('test_users')
        Group.objects.all().delete()

        def_rights = ['view_todonote', 'add_todonote', 'change_todonote', 'delete_todonote',
                      'view_project', 'view_user']
        project_owners_rights = ['view_todonote', 'add_todonote', 'change_todonote', 'delete_todonote',
                                 'view_project', 'add_project', 'change_project', 'delete_project',
                                 'view_user']
        User.objects.all().delete()
        Group.objects.all().delete()

        # Создаем группы пользователей

        admin_group = Group.objects.create(name="Администраторы")
        dev_group = Group.objects.create(name="Разработчики")
        project_owners_group = Group.objects.create(name="Владельцы проектов")

        # Выдаем группам права согласно заданию

        for permission in Permission.objects.all():
            admin_group.permissions.add(permission)

        for right in def_rights:
            dev_group.permissions.add(Permission.objects.get(codename=right))

        for right in project_owners_rights:
            project_owners_group.permissions.add(
                Permission.objects.get(codename=right))

        User.objects.create_superuser(
            username='django',
            first_name='Vasiliy',
            last_name='Pupkin',
            email='django@gb.local',
            password='geekbrains'
        )

        # Создаем тестовых пользователей для каждой группы

        admin_user = User.objects.create_user(
            username='admin',
            first_name='Администратор',
            last_name='Администратор',
            email='admin@mac.local',
            password='admin'
        )

        dev_user = User.objects.create_user(
            username='dev',
            first_name='Разработчик',
            last_name='Разработчик',
            email='dev@mac.local',
            password='dev'
        )

        project_owner_user = User.objects.create_user(
            username='pr_owner',
            first_name='Руководитель проекта',
            last_name='Руководитель проекта',
            email='pr_owner@mac.local',
            password='pr_owner'
        )

        # И включаем пользователей в соответствующие группы
        admin_user.groups.add(admin_group)
        dev_user.groups.add(dev_group)
        project_owner_user.groups.add(project_owners_group)

        for user in test_users:
            User.objects.create_user(**user)
