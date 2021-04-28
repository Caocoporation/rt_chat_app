from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import os

from django.conf import settings
# from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# Create your models here.

# Create a new user

# Create a superuser

class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email address.")

        if not username:
            raise ValueError("User must have a username.")

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
def get_profile_image_filepath(instance, filename):
    username = instance.username
    return f"profile_images/{username}/{filename}"

def get_default_profile_image():
    return "default_images/default.png"

class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True, null=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_image = models.ImageField(
        verbose_name="profile image",
        upload_to=get_profile_image_filepath,
        null=True,
        default=get_default_profile_image
    )
    hide_email = models.BooleanField(default=True)
    
    objects = MyAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_password(self):
        return self.password

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)

