from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Participant

User = get_user_model()

@receiver(signal=post_save, sender=User)
def create_account(sender, instance, created, **kwargs):
    if created:
        create_default_participant = Participant(
            user=instance,
            channel_name="default"
        )
        create_default_participant.save()