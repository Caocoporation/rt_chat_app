from django.shortcuts import render
from rest_framework import generics, status, permissions, viewsets
from .serializers import (
    UserSerializer, 
    UserLoginSerializer, 
    UserRegistrationSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Account
from django.contrib.auth import login, logout, authenticate
from django.contrib import auth
from django.conf import settings
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.core import serializers
from .serializers import UserSerializer
import jwt

from rt_chat_app.authorization import is_authorized, verify_token, access_token_authentication
# from rest_framework.decorators import api_view, permission_required

# Create your views here.

def login (request):
    return HttpResponse("<h1>Hello</h1>")

def register (request):
    return HttpResponse("<h1>Hello</h1>")

def profile (request, user_id):
    return HttpResponse(f"<h1>This is user {user_id}</h1>")

# class UserViewSet(viewsets.ModelViewSet):
#     permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
#     queryset = Account.objects.all()
#     serializer_class = UserSerializer

class UserLogoutView(APIView):
    def logout(self, request):
        logout(request)
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)
    

class UserRegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserRegistrationSerializer
    
    def post(self, request, format=None):
        if request.method == "POST":
            serializer = UserRegistrationSerializer(data=request.data)
            data = {}
            if serializer.is_valid():
                account = serializer.save()
                data['message'] = 'Account has been created successfully.'
                data['email'] = account.email
                data['username'] = account.username

                return Response(data, status=status.HTTP_201_CREATED)

            else: 
                data = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserLoginSerializer

    def account_authentication(self, username, password):
        user = authenticate(username=username, password=password)
        return user
            
    def post(self, request, format=None):
        if request.data:
            username = request.data.get('username')
            password = request.data.get('password')
            
            user = self.account_authentication(username, password)

            if user:
                # create a jwt token
                auth_token = jwt.encode(
                    {"user_id": user.id},
                    settings.SECRET_KEY
                )

                data = {
                    "user_id": user.id,
                    "token": auth_token
                }
               
                return Response({ "data": data }, status=status.HTTP_200_OK)    

        return Response({ 'Bad Request': 'Username or Password is invalid.' }, status=status.HTTP_400_BAD_REQUEST)

class SpecificUserView(APIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserSerializer
    queryset = Account.objects.all()
    
    def get(self, request):
        if request.method == "GET":
            if is_authorized(request) is None: 
                return Response({"message": "Bad request"}, status=status.HTTP_401_UNAUTHORIZED)

            else:
                access_token = is_authorized(request)
                # user now is payload
                payload = verify_token(access_token)

                if payload is not None:
                    user = Account.objects.get(id=payload['user_id'])

                    data = UserSerializer(user).data

                    print(data)
        
                    return Response({ "message": "Success !", "data": data, "user": payload }, status=status.HTTP_200_OK)

                else:
                    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)



class UserListView(APIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserSerializer
    queryset = Account.objects.all()

    def post(self, request, key):
        if request.method == "POST":
            current_username = request.user.username

            print(current_username)

            users_with_key = Account.objects.filter(username__contains=str(key)).exclude(username=current_username)

            print(users_with_key)

            if len(users_with_key) > 0:
                # list_of_users = [user for user in list(users_with_key) if user.username != current_username]

                # data = serializers.serialize("json", list_of_users)

                data = UserSerializer(users_with_key, many=True).data

                return Response({"data": data}, status=status.HTTP_200_OK)

            return Response({'message': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
    
# class BlacklistTokenUpdateView(APIView):
#     permission_classes = [permissions.AllowAny,]
#     authentication_classes = ()

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)