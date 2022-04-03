from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, TodoNoteFilter
from .models import Project, TodoNote
from .serializers import ProjectSerializer, TodoNoteSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import DjangoModelPermissions


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoNoteLimitOffsetPagination(LimitOffsetPagination):
    page_size = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoNoteViewSet(ModelViewSet):
    serializer_class = TodoNoteSerializer
    queryset = TodoNote.objects.all()
    filterset_class = TodoNoteFilter
    pagination_class = TodoNoteLimitOffsetPagination

    def perform_destroy(self, instance):
        instance.closed = True
        instance.save()
