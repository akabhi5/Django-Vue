from django.urls import path
from .views import TodoView, TodoComplete, TodoDelete

urlpatterns = [
    path('', TodoView.as_view(), name='todo_list'),
    path('<str:id>/complete/', TodoComplete.as_view()),
    path('<str:id>/delete/', TodoDelete.as_view()),
]
