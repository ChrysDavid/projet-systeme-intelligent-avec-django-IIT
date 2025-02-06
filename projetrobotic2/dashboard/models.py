from django.db import models
from django.contrib.auth.models import User

class ESPDevice(models.Model):
    name = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)