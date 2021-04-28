from django.contrib.auth import get_user_model

from channels.db import database_sync_to_async

from rt_chat_app.models import (
    Participant, 
    ChatRoom, 
    Role, 
    Group, 
    Message, 
    Notification
)

User = get_user_model()

@database_sync_to_async
def get_user(self, user_id):
    return User.objects.get(id=int(user_id))

@database_sync_to_async
def find_participant(self, user_id):
    try: 
        user = User.objects.filter(id=int(user_id))
        if len(user) > 0:
            participant = Participant.objects.get(user=user[0])
            return participant

    except Exception as e:
        print(e)

@database_sync_to_async
def update_channel_name(self, user_id, channel_name):
    user = User.objects.get(id=int(user_id))
    participant = Participant.objects.filter(user=user)

    if len(participant) > 0:
        if participant[0].channel_name != channel_name:
            participant[0].channel_name = channel_name
            participant[0].save()

@database_sync_to_async
def create_participant(self, user_id, room_code, channel_name, group_name):
    print("create_participant is running right now.")

    user = User.objects.get(id=int(user_id))
    host = ChatRoom.objects.filter(host=user, room_code=room_code)

    participant = Participant.objects.filter(user=user)
    # group = Group.objects.get(group_name=group_name)
    add_participant = None

    # fix .......
    is_admin = Role.objects.get(id=1)
    is_participant = Role.objects.get(id=2)

    if not participant.exists():
        create_participant = None

        if len(host) > 0:
            create_participant = Participant(user=user, role=is_admin, channel_name=channel_name)
        else:
            create_participant = Participant(user=user, role=is_participant, channel_name=channel_name)
        
        create_participant.save()
        
    else:
        role = is_admin if (len(host) > 0) else is_participant

        participant.update(
            channel_name=channel_name,
            role=role
        )

@database_sync_to_async
def add_user_to_lobby(self, room_name, user_id):
    try:
        user = User.objects.get(id=user_id)
        chat_room = ChatRoom.objects.get(room_name=room_name)
        chat_room.participants.add(user)

    except Exception as e:
        print(e)

@database_sync_to_async
def create_group(self, group_name):
    check_group = Group.objects.filter(group_name=group_name)

    if not check_group.exists():
        create_group = Group(group_name=group_name)
        create_group.save()

        get_new_group = Group.objects.get(group_name=group_name)
        # get_new_group.participants.add(host)

@database_sync_to_async
def remove_participant(self, user_id):
    user = User.objects.get(id=int(user_id))
    participant = Participant.objects.get(user=user)
    participant.delete()

@database_sync_to_async
def saving_message(self, user_id, message, room):
    print(room)
    user = User.objects.get(id=int(user_id))
    participant = Participant.objects.get(user=user)
    message = Message(author=participant, message=message, room=room)
    message.save()

@database_sync_to_async
def get_latest_message(self):
    return Message.objects.last()

@database_sync_to_async
def get_room(self, room_code):
    return ChatRoom.objects.get(room_code=room_code)

@database_sync_to_async
def adding_participant_to_room(self, room_code, participant_id):
    print("Participant join the room")
    room = ChatRoom.objects.get(room_code=room_code)
    participant = Participant.objects.get(id=participant_id)
    room.participants.add(participant)
    
@database_sync_to_async
def pending_request(self, sender, receiver, room, message):
    pending_notification = Notification(
        room=room, 
        sender=sender, 
        receiver=receiver,
        message=message 
    )

    pending_notification.save()

    return pending_notification

@database_sync_to_async
def finding_notification(self, notification):
    return Notification.objects.get(id=notification.get("id", None))

@database_sync_to_async
def removing_notification(self, notification):
    removing_notification = Notification.objects.get(id=notification.get("id", None)).delete()

@database_sync_to_async
def is_user_connection(self, user_id, group_dict, channel_name):
    user = User.objects.get(id=user_id)
    participant = Participant.objects.get(user=user)

    group_lists = list(group_dict.keys())

    if group_lists:
        for i in range(len(group_lists)):
            channel_lists = list(group_dict[group_lists[i]].keys())

            if channel_name in channel_lists:
                return True

    return False