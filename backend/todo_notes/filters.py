from django_filters import rest_framework as filters

from .models import Project, TodoNote


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoNoteFilter(filters.FilterSet):
    project_id__name = filters.CharFilter(field_name='project_id__name', lookup_expr='contains',
                                          label='Название проекта')
    created_at_gte = filters.DateFilter(field_name='created_at', lookup_expr='gte')
    created_at_lte = filters.DateFilter(field_name='created_at', lookup_expr='lte')
