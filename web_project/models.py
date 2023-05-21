from django.db import models

# Create your models here.


class Student(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    id = models.CharField(primary_key=True, max_length=8)
    email = models.EmailField()
    phone = models.CharField(max_length=11)
    gender = models.CharField(max_length=10)
    level = models.IntegerField()
    department = models.CharField(max_length=10)
    status = models.CharField(max_length=10)
    GPA = models.DecimalField(max_digits=3, decimal_places=2)
    birthdate = models.DateField()