from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Project
from .models import TodoNote
from authapp.serializer import UserModelSerializer


class ProjectSerializer(ModelSerializer):
    # user_id = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class TodoNoteSerializer(ModelSerializer):

    class Meta:
        model = TodoNote
        fields = '__all__'

    def validate(self, attrs):
        project_users = [user.id for user in attrs['project_id'].user_id.all()]
        if attrs['user_id'].id not in project_users:
            raise ValidationError('Пользователь не входит в список участников проекта')
        return attrs
