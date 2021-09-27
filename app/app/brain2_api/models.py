from django.db import models

# Create your models here.

class Author(models.Model):
    fname = models.CharField(max_length=255, blank=True)
    lname = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.fname} {self.lname}'

class BookTag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ManyToManyField(Author, blank=True)
    published = models.DateField(null=True, blank=True)
    tags = models.ManyToManyField(BookTag, blank=True)

    def __str__(self):
        return self.title

class NoteTag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Note(models.Model):
    highlight = models.TextField()
    annotation = models.TextField(blank=True)
    chapter = models.CharField(max_length=255, blank=True)
    datetime = models.DateTimeField(null=True, blank=True)
    book = models.ForeignKey(to=Book, on_delete=models.CASCADE)
    tags = models.ManyToManyField(NoteTag, blank=True)

    def __str__(self):
        return f'Note in {self.book}'



    

