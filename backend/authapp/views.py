from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import UpdateModelMixin
from .serializer import UserModelSerializer
from .models import User


class UserViewSet(UpdateModelMixin, ReadOnlyModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
