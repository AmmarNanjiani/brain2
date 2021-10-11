from django.urls import path
from app.brain2_api import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title = 'brain2 API',
        default_version = 'v1',
        description = 'API to access my note data on books.',
    ),
    public = True,
    permission_classes = (permissions.AllowAny,),
)

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

    path('', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]