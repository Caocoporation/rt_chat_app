from django.urls import re_path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    # re_path(r'^ws/chat/$', consumers.ChatConsumer),
    re_path(r'^ws/chat/(?P<room_code>\w+)/(?P<user_id>\w+)/$', ChatConsumer),
    # re_path(r'^ws/invite/(?P<room_code>\w+)/$', consumers.ParticipantConsumer),
]