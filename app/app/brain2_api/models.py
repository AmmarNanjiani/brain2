from django.db import models


# Create your models here.

class Author(models.Model):
    fname = models.CharField()
    lname = models.CharField()

    def __str__(self):
        return f'{self.fname} {self.lname}'

class BookTag(models.Model):
    name = models.CharField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField()
    author = models.ManyToManyField(Author)
    published = models.DateField()
    tags = models.ManyToManyField(BookTag)

    def __str__(self):
        return self.title

class NoteTag(models.Model):
    name = models.CharField()

    def __str__(self):
        return self.name

class Note(models.Model):
    highlight = models.TextField()
    annotation = models.TextField()
    chapter = models.CharField()
    datetime = models.DateTimeField()
    book = models.ForeignKey(to=Book, on_delete=models.CASCADE)
    tags = models.ManyToManyField(NoteTag)

    def __str__(self):
        return f'Note in {self.book} at {self.datetime}'



    

