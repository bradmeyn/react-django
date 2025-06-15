from django.urls import path
from .views import BusinessRegistrationView, UserCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    # Public auth endpoints
    path('register/', BusinessRegistrationView.as_view(), name='register'),  # For initial business signup
    
    # Protected endpoint for creating additional users
    path('users/', UserCreateView.as_view(), name='create_user'),

    # JWT token refresh endpoint
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]