from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status, permissions, viewsets
from .serializers import (
    ChatRoomSerializer, 
    MessageSerializer, 
    GroupSerializer, 
    ParticipantSerializer,
    NotificationSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ChatRoom, Group, Participant, Message, Notification
from user_management.models import Account
from django.conf import settings
import jwt
from .authorization import is_authorized, verify_token, access_token_authentication
from django.core import serializers
import json

from django.forms import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Model
import json as simplejson

from itertools import chain


# from django.utils import simplejson

# Create your views here.

class ExtendedEncoder(DjangoJSONEncoder):
    
    def default(self, o):

        if isinstance(o, Model):
            return model_to_dict(o)

        return super().default(o)

class RetrieveGroup(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

class RetrieveChatRoom2(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

class RetrieveNotification(APIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def get(self, request, user_id):
        if request.method == "GET":
            print("RetrieveNotification is running.")
            print(user_id)
            current_user_id = request.user.id

            notifications = Notification.objects.filter(receiver_id=current_user_id)

            print(notifications)

            if len(notifications) > 0:
                data = NotificationSerializer(notifications, many=True).data
                return Response({"data": data}, status=status.HTTP_200_OK)

            else:
                return Response({"data": "None"}, status=status.HTTP_200_OK)

            return Response({'message': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)

class RetrieveMessage(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


    def get(self, request, room_code):
        if request.method == "GET":
            payload = access_token_authentication(request)

            if payload is not None:    
                room = ChatRoom.objects.get(room_code=room_code)
                messages = Message.objects.filter(room=room)

                if len(messages) > 0:
                    data = MessageSerializer(messages, many=True).data

                    return Response({"data": data }, status=status.HTTP_200_OK)

                else:
                    return Response({"data": "None" }, status=status.HTTP_200_OK)

            else:
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)


class UpdateChatRoom(APIView):
    pass

class SearchChatRooms(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

    def post(self, request):
        if request.method == "POST":
            print(request.data)

            room_code = request.data.get("searchKey", None)

            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                access_token = is_authorized(request)
                payload = verify_token(access_token)

                if payload is not None:
                    searchingRooms = ChatRoom.objects.get(room_code=room_code)
                    print(searchingRooms)
                  
                    data = ChatRoomSerializer(searchingRooms).data
        
                    return Response({ "message": "Success !", "data": data, "user": payload }, status=status.HTTP_200_OK)

                else:
                    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            

class RetrieveChatRoom(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

    def get(self, request):
        if request.method == "GET":
               
            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                access_token = is_authorized(request)
                # user now is payload
                payload = verify_token(access_token)

                if payload is not None:
                    user = Account.objects.get(id=payload['user_id'])
                    participant = user.user.all()

                    print(participant[0].chatroom_set.all())

                    all_rooms = list(chain(participant[0].chatroom_set.all()))

                    data = ChatRoomSerializer(all_rooms, many=True).data
        
                    return Response({ "message": "Success !", "data": data, "user": payload }, status=status.HTTP_200_OK)

                else:
                    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

                
class RetrieveDetailedChatRoom(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

    def get(self, request, room_code):
        if request.method == "GET":
            print("Detailed room")
            print(request)
            print(room_code)

            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                access_token = is_authorized(request)

                payload = verify_token(access_token)

                if payload is not None:
                    room = ChatRoom.objects.get(room_code=room_code)

                    print(room)

                    data = ChatRoomSerializer(room).data
        
                    return Response({ "message": "Success !", "data": data, "user": payload }, status=status.HTTP_200_OK)

                else:
                    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

class RoomCreationView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatRoomSerializer

    def post(self, request, format=None):
        if request.method == "POST":
            print(request)
            room_name = request.data.get('room_name')

            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                access_token = is_authorized(request)
                payload = verify_token(access_token)

                if payload:
                    host = Account.objects.filter(username=payload['username'])
                    special_participant = Participant.objects.get(user=host[0])
                    print("hello, I'm the host")
                    print(special_participant)
                    create_room = ChatRoom(host=host[0], room_name=room_name)
                    create_room.save()
                    create_room.participants.add(special_participant)

                    data = self.serializer_class(create_room).data

                    return Response({ "room": data, "message": "The room has been created." }, status=status.HTTP_201_CREATED)

                else:
                    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


class AddParticipantToRoom(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChatRoomSerializer

    def post(self, request, room_code):
        if request.method == "POST":

            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                participant = Participant.objects.get(id=request.data.get("receiver_id"))
                chat_room = ChatRoom.objects.get(room_code=room_code)
                add_to_participants = chat_room.participants.add(participant)

                return Response({"message": "Successful"}, status=status.HTTP_200_OK)