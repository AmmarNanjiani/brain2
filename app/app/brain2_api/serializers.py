from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'fname', 'lname')

        validators = [
            UniqueTogetherValidator(
                queryset = Author.objects.all(),
                fields = ['fname', 'lname']
            )
        ]

class BookTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTag
        fields = ('id', 'name')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'published', 'tags')

class NoteTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteTag
        fields = ('id', 'name')

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'book', 'tags', 'datetime', 'chapter', 'highlight', 'annotation')
        

