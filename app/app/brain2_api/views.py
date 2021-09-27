from django.shortcuts import render
from rest_framework import generics
from .models import Author
from .serializers import *

# Create your views here.
class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookTagList(generics.ListCreateAPIView):
    queryset = BookTag.objects.all()
    serializer_class = BookTagSerializer

class BookTagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookTag.objects.all()
    serializer_class = BookTagSerializer

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class NoteTagList(generics.ListCreateAPIView):
    queryset = NoteTag.objects.all()
    serializer_class = NoteTagSerializer

class NoteTagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NoteTag.objects.all()
    serializer_class = NoteTagSerializer

class NoteList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer