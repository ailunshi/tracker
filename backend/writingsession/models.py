from django.db import models
from django.utils import timezone
from utils import writing
from django.contrib.auth.models import User

# Create your models here.
class WritingSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    word_count_start = models.IntegerField(default=0)
    word_count_end = models.IntegerField(default=0)
   
