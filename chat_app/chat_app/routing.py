import os
import rt_chat_app.routing
from channels.auth import AuthMiddlewareStack
# from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator

application = ProtocolTypeRouter({
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                rt_chat_app.routing.websocket_urlpatterns
            )
        )
    )
})