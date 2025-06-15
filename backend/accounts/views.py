from rest_framework import status
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, LoginSerializer, BusinessRegistrationSerializer, UserSerializer
import logging

logger = logging.getLogger(__name__)

class BusinessRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = BusinessRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Create user
            user = serializer.save()
            
            # Grant Django admin access
            user.is_staff = True
            user.is_superuser = True
            
            user.save()
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserRegistrationSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserCreateView(APIView):
    """Protected endpoint for creating additional business users"""
    permission_classes = [IsAuthenticated]  # Only authenticated users can create new users

    def post(self, request):
        # Add the business from the authenticated user
        request.data['business_id'] = request.user.business.id
        
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserRegistrationSerializer(user).data, 
                          status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)