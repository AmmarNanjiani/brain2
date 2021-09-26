from django.shortcuts import render
from rest_framework import generics
from .models import Author
from .serializers import AuthorSerializer 

# Create your views here.
class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer