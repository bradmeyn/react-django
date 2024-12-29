from django.db import models
from django.contrib.auth.models import User
import uuid

class Practice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PracticeUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name='practice_users')
    role = models.CharField(max_length=50, choices=[
        ('ADMIN', 'Administrator'),
        ('PROVIDER', 'Provider'),
        ('STAFF', 'Staff'),
    ])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'practice']  # User can't be added to same practice twice