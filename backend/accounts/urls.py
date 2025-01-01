from django.urls import path
from .views import PracticeRegistrationView, LoginView, UserCreateView

urlpatterns = [
    # Public auth endpoints
    path('register/', PracticeRegistrationView.as_view(), name='register'),  # For initial practice signup
    path('login/', LoginView.as_view(), name='login'),
    
    # Protected endpoint for creating additional users
    path('users/', UserCreateView.as_view(), name='create_user'),
]