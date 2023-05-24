from django.urls import path
from . import views
from .views import departAssignEdit
urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.log_user, name="login"),
    path('main/', views.main_page, name="main"),
    path('edit/', views.update_student, name="edit"),
    path('search/', views.search_student, name="search"),
    path('view-students/', views.view_students, name="view"),
    path('add-student', views.add_student, name="add"),
    path('depart-assign/', views.depart_assign, name="depart"),
    path('get_data/', views.get_data, name='get_data'),
    path('departAssignEdit/', departAssignEdit, name='depart_assign_edit'),
]
