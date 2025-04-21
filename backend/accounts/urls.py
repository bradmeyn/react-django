from django.urls import path
from .views import BusinessRegistrationView, LoginView, UserCreateView

urlpatterns = [
    # Public auth endpoints
    path('register/', BusinessRegistrationView.as_view(), name='register'),  # For initial business signup
    path('login/', LoginView.as_view(), name='login'),
    
    # Protected endpoint for creating additional users
    path('users/', UserCreateView.as_view(), name='create_user'),
]