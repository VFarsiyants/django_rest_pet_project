from rest_framework.viewsets import ModelViewSet
from .models import Project, TodoNote
from .serializers import ProjectSerializer, TodoNoteSerializer


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TodoNoteViewSet(ModelViewSet):
    serializer_class = TodoNoteSerializer
    queryset = TodoNote.objects.all()


