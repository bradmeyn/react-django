from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Business
from django.db import transaction
from django.contrib.auth import authenticate
User = get_user_model()

class BusinessRegistrationSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['business_name', 'email', 'password', 'first_name', 
                 'last_name', 'phone']

    @transaction.atomic
    def create(self, validated_data):
        business_name = validated_data.pop('business_name')
        # Create business
        business = Business.objects.create(
            name=business_name
        )
        # Create admin user
        user = User.objects.create(
            business=business,
            role='ADMIN',  
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['id', 'name']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    business = BusinessSerializer(read_only=True)
    business_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 
                 'business', 'business_id', 'role', 'phone']
        read_only_fields = ['id']

    def create(self, validated_data):
        business_id = validated_data.pop('business_id')
        password = validated_data.pop('password')
        business = Business.objects.get(id=business_id)
        
        user = User.objects.create(
            business=business,
            **validated_data
        )
        user.set_password(password)
        user.save()
        
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), 
                              username=email, password=password)
            
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'business', 'role', 'phone']
        # Don't include password in the returned data