from django.urls import path
from . import views

urlpatterns = [
    path('', views.project_select, name="project_select"),
    path('edit/', views.edit_page, name="edit_page"),
    path('update-student', views.update_stud, name="update_student")
]