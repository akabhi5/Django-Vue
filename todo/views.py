from .forms import TaskForm
from .models import Task
from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse

from django.forms.models import model_to_dict
from django.shortcuts import redirect


class TodoView(View):
    def get(self, request):
        tasks = list(Task.objects.values())

        if request.is_ajax():
            return JsonResponse({'tasks': tasks}, status=200)

        return render(request, 'index.html', context={'name': 'RED'})

    def post(self, request):
        bound_form = TaskForm(request.POST)

        if bound_form.is_valid():
            new_task = bound_form.save()
            return JsonResponse({'task': model_to_dict(new_task)}, status=200)

        return redirect('todo_list')


class TodoComplete(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.completed = True
        task.save()
        return JsonResponse({'task': model_to_dict(task)}, status=200)


class TodoDelete(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({'result': 'ok'}, status=200)