from django.db import models

class TodoList(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Todo(models.Model):
    description = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    dateCreated = models.DateTimeField(auto_now_add=True)
    todoList = models.ForeignKey(TodoList, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.description
    
