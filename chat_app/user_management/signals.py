from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
# from .models import Participant

User = get_user_model()

@receiver(signal=post_save, sender=User)
def create_account(sender, instance, created, **kwargs):
    if not created:
        print("True")
        print(instance.profile_image)
        # create_default_participant = Participant(
        #     user=instance,
        #     channel_name="default"
        # )

        # create_default_participant.save()
        # http://127.0.0.1:8000/media/website_logo/lagger.png
        # instance.profile_image = f"http://127.0.0.1:8000/media/{instance.profile_image}"
        # User.objects.filter(id=instance.id).update(profile_image=f"http://127.0.0.1:8000/media/{instance.profile_image}")
