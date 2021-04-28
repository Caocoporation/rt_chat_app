from django.apps import AppConfig


class RtChatAppConfig(AppConfig):
    name = 'rt_chat_app'

    def ready(self):
        import rt_chat_app.signals
