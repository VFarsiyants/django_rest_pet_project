from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import UpdateModelMixin

from .filters import UserFilter
from .serializer import UserModelSerializer, UserModelSerializerV2
from .models import User


class UserViewSet(UpdateModelMixin, ReadOnlyModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
    filterset_class = UserFilter

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV2
        return UserModelSerializer
        