from django.db import models

# Create your models here.
class Users(models.Model):
    userId = models.AutoField(primary_key=True)
    email = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    place = models.CharField(max_length=100)

class Data(models.Model):
    dataId = models.AutoField(primary_key=True)
    temp = models.FloatField()
    humid = models.FloatField()
    rain = models.FloatField()
    timestamp = models.FloatField()