import asyncio
import json
from rt_chat_app.serializers import ChatRoomSerializer, NotificationSerializer

# @asyncio.coroutine
async def invite_acception_handler(self, room_code, participant_id, notification):
    participant = (await self.find_participant(participant_id))
    room = await self.get_room(room_code)
    group_channel_name = f"chat_{room_code}"

    sending_invite_acception_to_group = await self.channel_layer.group_send(
        group_channel_name,
        {
            'type': 'invite_request_acception',
            'room': room,
            'notification': notification,
            'message': f' {participant.user.username} have been added into chat room {room.room_name}.'
        }
    )

    sending_invite_acception_to_user = await self.channel_layer.send(
        participant.channel_name,
        {
            'type': 'invite_request_acception',
            'room': room,
            'notification': notification,
            'message': f' You have been added into chat room {room.room_name}.'
        }
    )

async def invite_request_acception(self, event):
    message = event["message"]
    room = event["room"]
    notification = event["notification"]

    notification_object = await self.finding_notification(notification)
    removing_notification = await self.removing_notification(notification)

    data = {
        'type': 'INVITE_REQUEST_ACCEPTION',
        'message': message,
        'notification': NotificationSerializer(notification_object).data,
        'room': ChatRoomSerializer(room).data
    }

    await self.send({
        "type": "websocket.send",
        "text": json.dumps(data)
    })