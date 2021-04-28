from django.contrib import admin
from .models import Group, Message, Participant, Role, Action, ChatRoom, Notification

# Register your models here.

admin.site.register(Role)
admin.site.register(Action)
admin.site.register(Group)
admin.site.register(Message)
admin.site.register(Participant)
admin.site.register(ChatRoom)
admin.site.register(Notification)

