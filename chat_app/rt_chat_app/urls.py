from django.urls import path
from . import views

urlpatterns = [
    path('r_group/', views.RetrieveGroup.as_view(), name="retrieve-group"),
    path('r_room2/', views.RetrieveChatRoom2.as_view(), name="retrieve-group"),
    path('c_room/', views.RoomCreationView.as_view(), name="creat-room"),
    path('r_room/', views.RetrieveChatRoom.as_view(), name="get-room"),
    path('r_room/<str:room_code>/', views.RetrieveDetailedChatRoom.as_view(), name="get-room"),
    path('r_chat_msg/<str:room_code>/', views.RetrieveMessage.as_view(), name="get-chat-messages"),
    path('r_chat_notification/<int:user_id>/', views.RetrieveNotification.as_view(), name="get-chat-notification"),
    path('room/find/', views.SearchChatRooms.as_view(), name="search-room")

    # path('chatroom/<str:room_code>', views.chatroom, name="room")
]