from pydoc import cli
from django.test import TestCase
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from rest_framework import status

from .models import User
from .views import UserViewSet
from mixer.backend.django import mixer


class TestUserApi(TestCase):
    def setUp(self) -> None:
        mixer.blend(User)
        self.admin = User.objects.create_superuser(
            username='django',
            first_name='Vasiliy',
            last_name='Pupkin',
            email='django@gb.local',
            password='geekbrains'
        )
        return super().setUp()

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users')
        view = UserViewSet.as_view({'get': 'list'})
        force_authenticate(request, self.admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data['results']), 0)

    def test_client_retrieve(self):
        client = APIClient()
        client.login(username='django',
                     password='geekbrains')
        response = client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data['results']), 0)
        retrieve_id = response.data['results'][0]['id']
        response = client.get(f'/api/users/{retrieve_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserClientApi(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser(
            username='django',
            first_name='Vasiliy',
            last_name='Pupkin',
            email='django@gb.local',
            password='geekbrains'
        )
        self.user = mixer.blend(User, is_superuser=False)
        self.client.force_login(self.admin)
        return super().setUp()

    def test_requiered_authorization(self):
        self.client.logout()
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_without_permissions(self):
        self.client.logout()
        self.client.force_login(self.user)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
