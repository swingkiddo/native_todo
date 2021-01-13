from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TodoSerializer, TodoListSerializer
from .models import Todo, TodoList

class TodosView(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, context={"request": request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetailView(APIView):
    def get_todo(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        todo = self.get_todo(pk)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = self.get_todo(pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
class TodoListsView(APIView):
    def get(self, request):
        todo_lists = TodoList.objects.all()
        serializer = TodoListSerializer(
            todo_lists,
            context={"request": request},
            many=True
        )

        todos = Todo.objects.all().count()
        completed = Todo.objects.filter(completed=True).count()
        data = {
            "todoLists": serializer.data,
            "common": {
                "todos": todos,
                "completed": completed
            }
        }
        return Response(data=data)

    def post(self, request):
        serializer = TodoListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoListDetailView(APIView):
    def get_todolist(self, pk):
        try: 
            return TodoList.objects.get(pk=pk)
        except TodoList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        todo_list = self.get_todolist(pk)
        serializer = TodoListSerializer(todo_list, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        todo_list = self.get_todolist(pk)
        todo_list.delete()
        return Response(status.HTTP_204_NO_CONTENT)