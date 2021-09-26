from django.urls import path
from app.brain2_api import views

urlpatterns = [
    path('', views.AuthorList.as_view()),
    path('<int:pk>/', views.AuthorDetail.as_view())
]