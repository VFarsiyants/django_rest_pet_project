from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=64, verbose_name='Логин пользователя', unique=True)
    first_name = models.CharField(max_length=64, verbose_name='Имя пользователя')
    last_name = models.CharField(max_length=64, verbose_name='Фамилия пользователя')
    email = models.EmailField(unique=True)
