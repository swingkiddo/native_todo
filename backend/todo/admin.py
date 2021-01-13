from django.contrib import admin
from .models import Todo, TodoList

admin.site.register((Todo, TodoList))
