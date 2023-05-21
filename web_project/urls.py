from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.log_user, name="login"),
    path('main/', views.mainp, name="main"),

]