from django.db import models

# Create your models here.

# TODO: figure out what is going on with book published
# TODO: add ideas + facts backlinking
class Author(models.Model):
    fname = models.CharField(max_length=255, blank=True)
    lname = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.fname} {self.lname}'

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'fname',
                    'lname'],
                name='unique_author')
        ]


class BookTag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ManyToManyField(Author, blank=True) # there cannot be multiple books with the same title and author. enforce this at application level.
    published = models.DateField(null=True, blank=True)
    tags = models.ManyToManyField(BookTag, blank=True)

    def __str__(self):
        return self.title




class NoteTag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    highlight = models.TextField(unique=True)
    annotation = models.TextField(blank=True)
    chapter = models.CharField(max_length=255, blank=True)
    datetime = models.DateTimeField(null=True, blank=True)
    book = models.ForeignKey(to=Book, on_delete=models.CASCADE) # cannot be multiple books with the same highlight, book, and chapter. enforce at app level.
    tags = models.ManyToManyField(NoteTag, blank=True)
    linked_notes = models.ManyToManyField('self', symmetrical=True, blank=True)

    def __str__(self):
        return f'Note in {self.book}'