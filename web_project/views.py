from django.shortcuts import render

# Create your views here.


def project_select(request):
    return render(request, "ProjectSelection.html")


def edit_page(request):
    return render(request, "edit.html")


def update_stud(request):
    return None