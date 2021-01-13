from .models import Todo, TodoList
from rest_framework import serializers, status

class TodoSerializer(serializers.ModelSerializer):
    todoList = serializers.StringRelatedField()

    class Meta:
        model = Todo
        fields = ('pk', 'description', 'completed', 'todoList')

    def create(self, data):
        request = self.context['request']
        list_pk = request.data.get('todoList')
        todo_list = TodoList.objects.get(pk=list_pk)
        new_todo = Todo.objects.create(todoList=todo_list, **data)
        return new_todo
        
class TodoListSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True, source="todo_set")

    class Meta:
        model = TodoList
        fields = ('pk', 'name', 'todos')

