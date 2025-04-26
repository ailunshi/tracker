from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
def home(request):
    return render(request, 'writingsession/base.html')

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"message": "Login successful!"})
    return JsonResponse({"error": "Invalid credentials"}, status=400)

@api_view(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully!"})

@api_view(["GET"])
def user_info(request):
    """Check if user is authenticated"""
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username})
    return JsonResponse({"error": "Not authenticated"}, status=401)

@ensure_csrf_cookie  # Ensure the frontend gets a CSRF token
@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set"})

@api_view(["POST"])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def register_view(request):
    try:
        print("Registration attempt:", request.data)  # Debug print
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        name = request.data.get("name")

        # Validate required fields
        if not all([username, email, password]):
            missing_fields = [
                field for field, value in {
                    'username': username,
                    'email': email,
                    'password': password
                }.items() if not value
            ]
            return JsonResponse({
                "error": f"Missing required fields: {', '.join(missing_fields)}",
                "received": {
                    "username": bool(username),
                    "email": bool(email),
                    "password": bool(password),
                }
            }, status=400)

        # Validate email format
        if '@' not in email:
            return JsonResponse({"error": "Invalid email format"}, status=400)

        # Check existing users
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already registered"}, status=400)

        # Create user
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
        except Exception as e:
            print("User creation error:", str(e))
            return JsonResponse({"error": "Failed to create user account"}, status=400)
        
        # Set first and last name if provided
        if name:
            try:
                parts = name.split(' ', 1)
                user.first_name = parts[0]
                if len(parts) > 1:
                    user.last_name = parts[1]
                user.save()
            except Exception as e:
                print("Name update error:", str(e))
                # Don't return error here as the user is already created

        # Log the user in
        try:
            login(request, user)
        except Exception as e:
            print("Login error:", str(e))
            return JsonResponse({"error": "Account created but login failed"}, status=400)
        
        return JsonResponse({
            "message": "Registration successful",
            "username": user.username,
            "email": user.email
        })
    except Exception as e:
        print("Registration error:", str(e))
        return JsonResponse({
            "error": "Registration failed",
            "detail": str(e)
        }, status=400)
