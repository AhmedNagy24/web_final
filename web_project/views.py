from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import response


# Create your views here.


def home(request):
    return render(request, "ProjectSelection.html")


def log_user(request):
    if request.method == 'POST':
        username = request.POST['Username']
        password = request.POST['pass']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('main')
        else:
            messages.success(request, "user is not found")
            return redirect('login')
    else:
        return render(request, 'loginpage.html')


def main_page(request):
    return render(request, "mainpage.html")


def update_student(request):
    return render(request, "edit.html")


def add_student(request):
    return render(request, "AddStudent.html")


def depart_assign(request):
    return render(request, "department_assign.html")


def search_student(request):
    return render(request, "searchstudent.html")\



def view_students(request):
    return render(request, "view all students.html")

