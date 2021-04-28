import jwt
from django.conf import settings

def is_authorized(request):
    is_authorization =  request.headers.get("Authorization", None)

    if is_authorization is None:
        return None
    else:
        return request.headers['Authorization'].split(" ")[1]
    
def verify_token (access_token):
    payload = jwt.decode(access_token, key=settings.SECRET_KEY, algorithms="HS256")

    if payload:
        return payload
        
    return None


def access_token_authentication (request):
    if is_authorized(request):
        if verify_token(access_token=is_authorized(request)):
            return verify_token(access_token=is_authorized(request))

    return None            

            