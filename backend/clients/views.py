from django.shortcuts import render
from rest_framework import viewsets
from .models import Client, Note
from .serializers import ClientSerializer, NoteSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer