from django.urls import path
from app.brain2_api import views

urlpatterns = [
    path('author/', views.AuthorList.as_view()),
    path('author/<int:pk>/', views.AuthorDetail.as_view()),

    path('book_tag/', views.BookTagList.as_view()),
    path('book_tag/<int:pk>/', views.BookTagDetail.as_view()),

    path('book/', views.BookList.as_view()),
    path('book/<int:pk>/', views.BookDetail.as_view()),

    path('note_tag/', views.NoteTagList.as_view()),
    path('note_tag/<int:pk>/', views.NoteTagDetail.as_view()),

    path('note/', views.NoteList.as_view()),
    path('note/<int:pk>/', views.NoteDetail.as_view()),

]