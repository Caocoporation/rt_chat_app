import json
import os, sys
# sys.path.insert(0, os.path.abspath(".."))
from importlib import import_module
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async
# from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async, async_to_sync
from .serializers import (
    ParticipantSerializer, 
    ChatRoomSerializer,
    NotificationSerializer
)

import datetime
import asyncio

from .models import (
    Group, Message, 
    Participant, Role, 
    ChatRoom, Notification
)


# from rt_chat_app.consumer_sender.invite_request_acception_sender import sent_invite_request_acception

class ChatConsumer(AsyncConsumer):
    from rt_chat_app.consumer_data_handler._database_handler import (
        get_user, 
        get_room,
        find_participant, 
        update_channel_name, 
        create_participant,
        add_user_to_lobby, 
        create_group,
        remove_participant,
        saving_message,
        get_latest_message,
        adding_participant_to_room,
        pending_request, 
        is_user_connection, 
        removing_notification, 
        finding_notification
    )
    
    async def websocket_connect(self, event):
        self.room_code = self.scope['url_route']['kwargs']['room_code']
        self.room_group_name = f"chat_{self.room_code}"
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.user = await self.get_user(self.user_id)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        print(self.channel_layer.groups)

        try: 
            # create_group = await self.create_group(group_name=self.room_group_name)
            create_participant = await self.create_participant(self.user_id, self.room_code, self.channel_name, self.room_group_name)
            # add_user_to_group = await self.add_user_to_group(self.user_id, self.channel_name, self.room_group_name)

        except Exception as e:
            print(e)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'joining_message',
                'message': f'{self.user.username} hopped into the chat room.'
            }
        )

        await self.send({
            "type": "websocket.accept"
        })

    async def joining_message (self, event):
        message = event['message']

        data = {
            'type': 'JOINING_NOTICE',
            'message': message
        }

        await self.send({
            "type": "websocket.send",
            "text": json.dumps(data)
        })
        
    async def websocket_disconnect(self, event):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # remove_participant = await self.remove_participant(self.user_id)

        print("disconnected ", event)

    async def websocket_receive(self, event):
        print(event)
        dict_data = json.loads(event.get('text'))
        command = dict_data.get('command')
        message = dict_data.get('message')
        
        print(command)

        self.user_id = dict_data.get('user_id', None)
        self.receiver_id = dict_data.get('receiver_id', None)
        
        if command == "sending_message":
            room_code = dict_data.get('room_code', None)

            message_handler = await self.message_sending_handler(
                user_id=self.user_id, 
                message=message,
                room_code=room_code
            )

        if command == "deny_invite_request":
            notification = dict_data.get("notification", None)
     
            print(notification)

            invite_request_denial_handler = await self.invite_request_denial_handler(notification)

        if command == "accepting_invite_request":
            participant = dict_data.get('user', None)
            participant_id = participant.get('user_id', None)
            notification = dict_data.get('notification', None)
            room = notification.get('room', None)
            room_code = room.get('room_code', None)

            invite_request_acception_handler = await self.invite_request_acception_handler(room_code, participant_id, notification)
           
        if command == "inviting_user":
            room_code = dict_data.get("room_code")
            self.room = await self.get_room(room_code)

            invite_request_handler = await self.invite_request_handler(
                receiver_id=self.receiver_id, 
                sender_id=self.user_id, 
                room=self.room)
        
        if command == "friending_user":
            friending_request_handler = await self.invite_request_handler(self)

    # MESSAGE HANDLER

    from rt_chat_app.consumer_sender._sending_message import group_chat_message

    async def message_sending_handler(self, user_id, message, room_code):
        from rt_chat_app.consumer_sender._sending_message import _message_sending_handler

        run_message_sending_handler = await _message_sending_handler(self, user_id, message, room_code)

    # this is channel_layer handler, it will get access to all channels inside a group
    # that means it will loop through every single channel
    # don't save send messages or save data into db in this function.
    
    # FRIENDING REQUEST HANDLER

    async def friending_request_handler(self, event):
        pass

    # INVITE REQUEST HANDLER

    from rt_chat_app.consumer_sender._sending_invite_request import (
        failed_invite_request, 
        invite_request
    )

    async def invite_request_handler(self, receiver_id, sender_id, room):
        from rt_chat_app.consumer_sender._sending_invite_request import _invite_request_handler
        run_invite_request_handler = await _invite_request_handler(self, receiver_id, sender_id, room)


    # INVITE REQUEST ACCEPTION HANDLER

    from rt_chat_app.consumer_sender._sending_acception import invite_request_acception

    async def invite_request_acception_handler (self, room_code, participant_id, notification):
        adding_participant_to_room = await self.adding_participant_to_room(
                                                                room_code=room_code, 
                                                                participant_id=participant_id
                                                            )

        from rt_chat_app.consumer_sender._sending_acception import invite_acception_handler

        acception_handler = await invite_acception_handler(self, room_code, participant_id, notification)

    # INVITE REQUEST DENIAL HANDLER

    async def invite_request_denial_handler (self, notification):
        removing_notification = await self.removing_notification(notification)
        
        from rt_chat_app.consumer_sender._sending_invite_request_denial import invite_denial_handler

        run_invite_request_denial = await invite_denial_handler(self, notification)

    
        
        