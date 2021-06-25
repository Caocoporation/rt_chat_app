from rest_framework import serializers
from rest_framework.serializers import (
    ValidationError, 
    SerializerMethodField, 
    HyperlinkedModelSerializer
)
from .models import (
    ChatRoom, Message, Participant, 
    Group, Notification
)

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
        depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 2

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
        depth = 1

class ChatRoomSerializer(serializers.ModelSerializer):
    room_name = serializers.CharField(required=True)

    class Meta:
        model = ChatRoom
        fields = '__all__'
        depth = 2

    def validate(self, data):
        if len(data["room_name"]) < 3 or len(data["room_name"]) > 50:
            raise ValidationError("Room name has to be in range from 3 to 50.", code="15203")

        return data

    def create(self, validated_data):
        room_object = ChatRoom(**validated_data)
        room_object.save()

        return validated_data

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        depth = 2
