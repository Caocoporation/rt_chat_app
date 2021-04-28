import asyncio
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

@database_sync_to_async
def get_user (user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

class QueryAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, inner):
        # Store the ASGI application we were passed
        self.inner = inner

    def __call__(self, scope):
        return QueryAuthMiddlewareInstance(scope, self)


class QueryAuthMiddlewareInstance:
    """
    Inner class that is instantiated once per scope.
    """

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).

        self.scope['user'] = await get_user(int(self.scope['url_route']['kwargs']['user_id']))

        # Instantiate our inner application
        inner = self.inner(self.scope)

        return await inner(receive, send)