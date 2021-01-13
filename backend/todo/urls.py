from django.urls import path
from .views import *

urlpatterns = [
    path('todos/', TodosView.as_view()),
    path('todos/<int:pk>/', TodoDetailView.as_view()),
    path('todolists/', TodoListsView.as_view()),
    path('todolists/<int:pk>', TodoListDetailView.as_view())
]