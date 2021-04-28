from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'users', views.UserViewSet, basename="user")

urlpatterns = [
    path('login', views.UserLoginView.as_view(), name="login"),
    path('logout', views.UserLogoutView.as_view(), name="logout"),
    path('register', views.UserRegisterView.as_view(), name="register"),
    path('invite/<str:key>', views.UserListView.as_view(), name="user-list"),
    path('profile/<int:user_id>', views.profile, name="profile"),
    path('user_details', views.SpecificUserView.as_view(), name="user-details"),
    # path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(), name="blacklist"),
] 