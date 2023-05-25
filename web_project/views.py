from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import response
from web_project.models import Student
import json
from django.shortcuts import get_object_or_404


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
        return render(request, 'AddStudent.html')


def departAssignEdit(request):
    if request.method == 'POST':
        department = request.POST.get('department')
        student_id = request.POST.get('id')
        student = Student.objects.get(id=student_id)
        if student.level > 2 and student.GPA > 2 and Student.objects.filter(id=student_id).exists():
            student.department = department
            student.save()
            return HttpResponse("Student assigned successfully")
        else:
            return HttpResponse("Student can't be assigned to this department\n")
    else:
        return HttpResponse("Invalid request")


def depart_assign(request):
    return render(request, "department_assign.html")


def search_student(request):
    return render(request, "searchstudent.html")


def view_students(request):
    return render(request, 'view all students.html')


def get_data(request):
    data = Student.objects.all().values()  # Retrieve all objects and their values
    return JsonResponse(list(data), safe=False)


def edit_student(request):
    if request.method == "POST":
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
        old_id = request.POST.get('old_id')

        if Student.objects.filter(id=ID).exists() and old_id != ID:
            return HttpResponse("Error: ID already in use! please enter a unique ID")
        else:
            Student.objects.get(id=old_id).delete()
            new_data = Student(firstname=first_name, lastname=last_name, id=ID, email=mail, phone=phone,
                                  gender=gender, level=level, department=department, status=status, GPA=gpa,
                                  birthdate=birth_date)
            new_data.save()
            return HttpResponse("Student information is updated successfully!")


def delete_student(request):
    if request.method == "POST":
        id_num = request.POST.get('id')
        Student.objects.get(id=id_num).delete()
        return HttpResponse("Student deleted successfully!")
