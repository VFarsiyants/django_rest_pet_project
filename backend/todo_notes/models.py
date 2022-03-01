from django.db import models

from authapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name='Имя проекта')
    repo_link = models.CharField(max_length=200, unique=True, verbose_name='Ссылка на репозиторий')
    user_id = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class TodoNote(models.Model):
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, verbose_name='Текст заметки')
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата обновления')
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    closed = models.BooleanField(default=False, verbose_name='Статус', )
