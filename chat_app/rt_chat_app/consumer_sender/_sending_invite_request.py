import json
import asyncio
from rt_chat_app.serializers import NotificationSerializer

async def _invite_request_handler(self, receiver_id, sender_id, room):
    if receiver_id is not None:
                self.sender = (await self.find_participant(sender_id))
                self.receiver = (await self.find_participant(receiver_id))

                is_user_online = await self.is_user_connection(
                    receiver_id, 
                    self.channel_layer.groups, 
                    self.receiver.channel_name)

                print(is_user_online)
                print(self.receiver.channel_name)

                if is_user_online:
                    try:
                        await self.channel_layer.send(
                            self.receiver.channel_name,
                            {
                                'type': 'invite_request',
                                'receiver': self.receiver,
                                'sender': self.sender,
                                'room': room,
                                'message': f'{self.sender.user.username} wants to invite you into chat room {room.room_name}.'
                            }
                        )

                    except Exception as e:
                        print(e) 

                else:
                    try:
                        await self.channel_layer.send(
                            self.sender.channel_name,
                            {
                                'type': 'failed_invite_request',
                                'receiver': self.receiver,
                                'sender': self.sender,
                                'room': room,
                                'message': f'{self.receiver.user.username} is not online right now. Your request will be sent to his notification box.'
                            }
                        )

                    except Exception as e:
                        print(e) 

async def failed_invite_request(self, event):
    message = event['message']
    room = event['room']
    room_name = room.room_name

    create_pending_invite_request = await self.pending_request(
        sender=event['sender'], 
        receiver=event['receiver'], 
        room=room, 
        message= f'{self.sender.user.username} wants to invite you into chat room {room_name}.'
    )

    data = {
        'type': 'FAILED_INVITE_REQUEST',
        'message': message,
        'notification': NotificationSerializer(create_pending_invite_request).data
    }

    await self.send({
        "type": "websocket.send",
        "text": json.dumps(data)
    })

async def invite_request(self, event):
    message = event['message']

    print("Look through the event")
    print(event)
    
    create_pending_invite_request = await self.pending_request(
        sender=event['sender'], 
        receiver=event['receiver'], 
        room=event['room'], 
        message=message
    )

    data = {
        'type': 'INVITE_REQUEST',
        'message': message,
        'notification': NotificationSerializer(create_pending_invite_request).data
    }

    await self.send({
        "type": "websocket.send",
        "text": json.dumps(data)
    })