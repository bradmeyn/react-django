from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Practice
from django.db import transaction
User = get_user_model()

class PracticeRegistrationSerializer(serializers.ModelSerializer):
    practice_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['practice_name', 'email', 'password', 'first_name', 
                 'last_name', 'phone']

    @transaction.atomic
    def create(self, validated_data):
        practice_name = validated_data.pop('practice_name')
        # Create practice
        practice = Practice.objects.create(
            name=practice_name
        )
        # Create admin user
        user = User.objects.create(
            practice=practice,
            role='ADMIN',  # or 'SUPER_ADMIN' depending on your needs
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class PracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = ['id', 'name']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    practice = PracticeSerializer(read_only=True)
    practice_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 
                 'practice', 'practice_id', 'role', 'phone']
        read_only_fields = ['id']

    def create(self, validated_data):
        practice_id = validated_data.pop('practice_id')
        password = validated_data.pop('password')
        practice = Practice.objects.get(id=practice_id)
        
        user = User.objects.create(
            practice=practice,
            **validated_data
        )
        user.set_password(password)
        user.save()
        
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()