from django.db import models
from django.conf import settings

class Todo(models.Model):

    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    editing = models.BooleanField(default=False)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)


    def __str__(self):
        return self.title

