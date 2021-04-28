from django.db import models
from django.conf import settings
import string
import random

# Create your models here.

def room_code_generator ():
    code = []
    flag = True
    characters = string.ascii_letters + string.digits

    while flag: 
        code = random.choices(list(characters), k=15)
        if code[0].isalpha():
            flag = False
        
    return "".join(code)

class Action (models.Model):
    move = models.CharField(max_length=100, null=True)

class Role (models.Model):
    position = models.CharField(max_length=100, null=True)
    action = models.ForeignKey(to=Action, on_delete=models.CASCADE, null=True)

class Participant (models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name="user", on_delete=models.CASCADE, null=True)
    role = models.ForeignKey(to=Role, on_delete=models.CASCADE, null=True)
    friends = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name="friends", blank=True)
    channel_name = models.CharField(max_length=255, null=False, default="lobby")
    joined_date = models.DateTimeField(auto_now_add=True, null=True)
    status = models.BooleanField(null=False, default=True)

    def __str__(self):
        return self.user.username

class Group (models.Model):
    group_name = models.CharField(max_length=255, null=False)
    created_date = models.DateTimeField(auto_now_add=True)
        
class ChatRoom (models.Model):
    room_code = models.CharField(max_length=15, default=room_code_generator, unique=True, null=False)
    room_name = models.CharField(max_length=50)
    participants = models.ManyToManyField(to=Participant, blank=True)
    host = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.room_name

class Message (models.Model):
    author = models.ForeignKey(to=Participant, on_delete=models.CASCADE)
    message = models.TextField(null=False)
    room = models.ForeignKey(to=ChatRoom, on_delete=models.CASCADE, null=True)
    sent_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.user.username

class Notification (models.Model):
    request_type = models.TextField(null=True)
    room = models.ForeignKey(to=ChatRoom, on_delete=models.CASCADE, null=True)
    sender = models.ForeignKey(to=Participant, on_delete=models.CASCADE, related_name="sender", null=False, default="")
    receiver = models.ForeignKey(to=Participant, on_delete=models.CASCADE, related_name="receiver", null=False, default="")
    message = models.TextField(null=True)
    invited_at = models.DateTimeField(auto_now_add=True)




