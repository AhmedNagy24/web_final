from django.shortcuts import render, redirect
from django.http import HttpResponse , JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import response
from web_project.models import Student



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
    if request.method == 'POST':
        # Retrieve the data sent via AJAX
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        ID = request.POST.get('ID')
        mail = request.POST.get('mail')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        level = request.POST.get('level')
        department = request.POST.get('department')
        status = request.POST.get('status')
        gpa = request.POST.get('gpa')
        birth_date = request.POST.get('birth_date')

        if Student.objects.filter(id=ID).exists():
            return HttpResponse("Error: Student already exists")
        else:
            new_student = Student(firstname=first_name, lastname=last_name, id=ID, email=mail, phone=phone,
                                  gender=gender, level=level, department=department, status=status, GPA=gpa,
                                  birthdate=birth_date)
            new_student.save()
            return HttpResponse("Student added successfully")
    else:
        return render(request , 'AddStudent.html')


def depart_assign(request):
    return render(request, "department_assign.html")


def search_student(request):
    if request.method == 'GET':
        #GID = request.GET.get('q')
        return render(request, "searchstudent.html")



def view_students(request):
    return render(request, 'view all students.html')

def get_data(request):
    data = Student.objects.all().values()  # Retrieve all objects and their values
    return JsonResponse(list(data), safe=False)


