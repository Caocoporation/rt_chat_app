import jwt
from django.conf import settings


def is_authorized(func):
    def wrapper(*args, **kwargs):

        is_authorization =  kwargs["request"].headers.get("Authorization", None)

        if is_authorization is not None:
            rv = func(*args, **kwargs)
            return rv

    return wrapper

@is_authorized
def verify_token(request):
    is_authorization =  request.headers.get("Authorization", None)
    access_token = is_authorization.split()[1]

    payload = jwt.decode(access_token, key=settings.SECRET_KEY, algorithms="HS256")

    if payload:
        return payload
        
    return None


    