import jwt
from rest_framework import authentication, exceptions
from django.conf import settings


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_data = authentication.get_authorization_header(request)
        
        if not auth_data:
            return None

        prefix, token = auth_data.decode('utf-8').split(' ')

        print(prefix)
        print(token)

        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user_id = settings.AUTH_USER_MODEL.objects.get(id=payload["user_id"])
            return (user_id, token)

        except  jwt.DecodeError as identifier:
            
            raise exceptions.AuthenticationFailed("Your token is invalid.")

        except jwt.ExpiredSignatureError as identifier:
            raise exceptions.AuthenticationFailed("Your token is expired.")
        
        return super().authenticate(request)
