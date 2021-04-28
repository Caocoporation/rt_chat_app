from rest_framework import serializers
from .models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        

class UserLoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=100,
        min_length=8,
        write_only=True,
        style={'input_type': 'password'}
    )

    username = serializers.CharField(
        max_length=100,
        min_length=8,
    )

    class Meta:
        model = Account
        fields = ('username', 'password')


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        required=True, 
        write_only=True,
        style={'input_type': 'password'}
    )

    password = serializers.CharField(
        required=True, 
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = Account
        fields = ('username', 'password', 'password2', 'email')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def check_password(password):
        counter = 0
        for i in range(len(password)):
            if password[i].isupper():
                counter += 1
        
        if counter == 0:
            raise serializers.ValidationError({"password": "Password need an uppercase."})

    
    def save(self):
        # create an account object
        account = Account(
            username = self.validated_data['username'],
            email = self.validated_data['email']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({ 'password2': 'Passwords must match.'  })
        
        # set_password function will take the input password and encode it
        account.set_password(password)
        account.save()

        return account

class UserProfileUpadateSerializer(serializers.ModelSerializer):
    pass
    

    