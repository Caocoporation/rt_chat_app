import asyncio
import json
from rt_chat_app.serializers import ParticipantSerializer, ChatRoomSerializer

async def _message_sending_handler(self, user_id, message, room_code):
    room = await self.get_room(room_code)

    save_message = await self.saving_message(
                user_id=user_id, 
                message=message,
                room=room
            )

    latest_message = await self.get_latest_message()

    print(f"the last message: {latest_message.message}")
    print(f"the last message: {latest_message.id}")
    print(f"the last message: {latest_message.room}")

    data = {
        'type': 'NEW_MESSAGE',
        'id': latest_message.id,
        'author': ParticipantSerializer(await self.find_participant(user_id)).data,
        'message': latest_message.message,
        'room': ChatRoomSerializer(latest_message.room).data,
        'sent_date': str(latest_message.sent_date)
    }

    await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'group_chat_message',
                'data': json.dumps(data)
            }
        )

async def group_chat_message(self, event):
    data = json.loads(event['data'])

    await self.send({
        "type": "websocket.send",
        "text": json.dumps(data)
    })