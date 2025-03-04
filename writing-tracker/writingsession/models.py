from django.db import models
from django.utils import timezone
from utils import writing

# Create your models here.
class Session(models.Model):
    file_path = models.CharField(max_length=255)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    start_word_count = models.IntegerField(default=0)
    end_word_count = models.IntegerField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def start_session(self):
        """Start a new writing session"""
        self.start_time = timezone.now()
        self.start_word_count = writing.get_word_count(self.file_path)
        self.save()
        return self.start_word_count

    def end_session(self):
        """End a writing session"""
        self.end_time = timezone.now()
        self.end_word_count = writing.get_word_count(self.file_path)
        self.duration = self.end_time - self.start_time
        self.save()
        return self.end_word_count
    
    @property
    def word_count_change(self):
        """Calculate the word count change during the session"""
        if self.start_word_count is None or self.end_word_count is None:
            return 0
        return self.end_word_count - self.start_word_count
    
   
