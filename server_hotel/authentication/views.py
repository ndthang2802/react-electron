from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect,csrf_exempt
from .serializers import UserSerializer
from .utils import generate_access_token, generate_refresh_token
import jwt
from rest_framework import status
from django.conf import settings

@api_view(['GET'])
def profile(request):
    user = request.user
    serialized_user = UserSerializer(user).data
    return Response({'user': serialized_user })

# refresh nếu token hết hạn
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def refresh_token_view(request):
    '''
    To obtain a new access_token this view expects 2 important things:
        1. a cookie that contains a valid refresh_token
        2. a header 'X-CSRFTOKEN' with a valid csrf token, client app can get it from cookies "csrftoken"
    '''
    User = get_user_model()
    refresh_token = request.COOKIES.get('refreshtoken')
    if refresh_token is None:
        raise exceptions.AuthenticationFailed(
            'Authentication credentials were not provided.')
    try:
        payload = jwt.decode(
            refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            'expired refresh token, please login again.')

    user = User.objects.filter(id=payload.get('user_id')).first()
    if user is None:
        raise exceptions.AuthenticationFailed('User not found')

    if not user.is_active:
        raise exceptions.AuthenticationFailed('user is inactive')


    access_token = generate_access_token(user)
    return Response({'access_token': access_token})


# đăng nhập vào hệ thống, trả về token và csrf cookie
@api_view(['POST'])
@ensure_csrf_cookie
@permission_classes([AllowAny])
def login_view(request):
    User = get_user_model()
    username = request.data.get('username')
    password = request.data.get('password')
    response = Response()
    if (username is None) or (password is None):
        raise exceptions.AuthenticationFailed(
            'username and password required')


    user = User.objects.filter(username=username).first()
    if(user is None):
        print('None')
        raise exceptions.AuthenticationFailed('user not found')
    if (not user.check_password(password)):
        print('checking password')
        raise exceptions.AuthenticationFailed('wrong password')

    serialized_user = UserSerializer(user).data

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    response.set_cookie(key='refreshtoken', value=refresh_token,samesite='None',secure=True, httponly=True)
    response.data = {
        'access_token': access_token,
        'user': serialized_user,
    }

    return response

# Log out 
@api_view(['POST'])
@ensure_csrf_cookie
@permission_classes([AllowAny])
def logout(request):
        response = Response()
        response.delete_cookie('refreshtoken')
        response.delete_cookie('csrftoken')
        return response