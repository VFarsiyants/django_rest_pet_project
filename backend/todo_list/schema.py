from dataclasses import field
from pyexpat import model
from socket import gaierror
from statistics import mode
from typing import List
from coreapi import Object
import graphene
from graphene_django import DjangoObjectType
from todo_notes.models import TodoNote, Project
from authapp.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodoNoteType(DjangoObjectType):
    class Meta:
        model = TodoNote
        field = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        field = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todo_notes = graphene.List(TodoNoteType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    todo_notes_by_user_name = graphene.List(
        TodoNoteType, name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todo_notes(root, info):
        return TodoNote.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None
    
    def resolve_todo_notes_by_user_name(self, info, name=None):
        todo_notes = TodoNote.objects.all()
        if name:
            todo_notes = todo_notes.filter(user_id__first_name=name)
        return todo_notes

class TodoNoteMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    todo_note = graphene.Field(TodoNoteType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo_note = TodoNote.objects.get(id=id)
        todo_note.text = text
        todo_note.save()
        return TodoNoteMutation(todo_note=todo_note)

class Mutation(graphene.ObjectType):
    update_todo_note = TodoNoteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
