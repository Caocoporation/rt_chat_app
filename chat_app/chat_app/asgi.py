# """
# ASGI config for chat_app project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
# """

# import os
# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
# import rt_chat_app.routing

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chat_app.settings')

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     # Just HTTP for now. (We can add other protocols later.)
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             rt_chat_app.routing.websocket_urlpatterns,
#             # user_management.routing.websocket_urlpatterns,
#         )
#     ),
# })
