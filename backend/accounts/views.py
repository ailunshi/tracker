from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
from .serializers import UserSerializer

class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            if user.is_authenticated:
                return Response({'is_authenticated': 'success'})
            else:
                return Response({'is_authenticated': 'failure'})
        except:
            return Response({'error': 'Something went wrong while authenticating'})

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        # might need to come back here bc rn first and last name are not entered separately
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['email'] #email is used as username
        password = data['password']
        re_password = data['re_password']

        try:
            # check if user already exists
            if User.objects.filter(username=username).exists():
                return Response({'error': 'An account already exists for this email.' })
            elif password != re_password:
                return Response({'error': 'Passwords do not match.'})
            elif len(password) < 8:
                return Response({'error': 'Password must be at least 8 characters long.'})
            else:
                user = User.objects.create_user(username=username, password=password)

                UserProfile.objects.create(user=user, first_name=first_name, last_name=last_name, email=username)

                return Response({'success': 'Account created successfully.'})

        except Exception as e:
            print("Error:", e)
            return Response({'error': str(e)})
            #return Response({'error': 'Something went wrong while signing up for a new account.'})

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['email']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            else:
                return Response({'error': 'Error authenticating user'})
        except Exception as e:
            print("Login error:", e)
            return Response({'error': str(e)})

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'User logged out successfully'})
        except:
            return Response({'error': 'Something went wrong while logging out.'})
        
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF token set'})

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)

class DeleteUserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def delete(self, request, format=None):
        user = self.request.user

        try:
            user = User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong while deleting user.'})