from django.db import models

class Data(models.Model):
    dataId = models.AutoField(primary_key=True)
    temp = models.FloatField()
    humid = models.FloatField()
    rain = models.FloatField()
    timestamp = models.FloatField()
    def __str__(self):
        return self.dataId 