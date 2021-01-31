from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from .serializers import TodoSerializer
from .models import Todo
from rest_framework.permissions import IsAuthenticated

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user

class TodoList(generics.ListAPIView):
    serializer_class=TodoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor,]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user)

class TodoCreate(generics.CreateAPIView):
    serializer_class=TodoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor,]
    queryset = Todo.objects.all()
    
class TodoUpdate(generics.RetrieveUpdateAPIView):
    serializer_class=TodoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor,]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user)

class TodoDestroy(generics.RetrieveDestroyAPIView):
    serializer_class=TodoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor,]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(author=user)


### VIEWS WITH VIEWSET ###
# class TodoView(viewsets.ModelViewSet):
#     serializer_class=TodoSerializer
#     permission_classes = [permissions.IsAuthenticated, IsAuthor,]
#     # permission_classes = [permissions.AllowAny]

#     def get_queryset(self):
#         user = self.request.user
#         return Todo.objects.filter(author=user)
