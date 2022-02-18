from rest_framework.viewsets import ModelViewSet
from .serializer import UserModelSerializer
from .models import User


class UserViewSet(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
