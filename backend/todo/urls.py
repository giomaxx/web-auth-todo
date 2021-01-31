from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.TodoList.as_view(), name='todolist'),
    path('create/', views.TodoCreate.as_view(), name='todocreate'),
    path('update/<int:pk>/', views.TodoUpdate.as_view(), name='todoupdate'),
    path('delete/<int:pk>/', views.TodoDestroy.as_view(), name='tododelete'),
]