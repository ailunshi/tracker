from django.urls import path
from .views import SignupView, LoginView, CheckAuthenticatedView, GetCSRFToken, LogoutView, GetUsersView, DeleteUserView, CheckUserAuthenticatedView, GetCurrentUserView

urlpatterns = [
    path('register/', SignupView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('authenticated/', CheckAuthenticatedView.as_view(), name='check_authenticated'),
    path('csrf_cookie/', GetCSRFToken.as_view(), name='csrf_cookie'),
    path('get_users/', GetUsersView.as_view(), name='get_users'),
    path('delete_user/', DeleteUserView.as_view(), name='delete_user'),
    path('user/', CheckUserAuthenticatedView.as_view(), name='check_user_authenticated'),
    path('current_user/', GetCurrentUserView.as_view(), name='get_current_user'),
]