from django.shortcuts import render
from django.http import HttpResponse, response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
# Create your views here.
@api_view(['POST'])
def authentication(request):
    request_body = json.loads(request.body)
    if request_body['username'] == 'testuser' and request_body['password'] == 'secret':
        res = HttpResponse(status=status.HTTP_200_OK)
        res.set_cookie(key='token',value='thisistoken',httponly=True)
        return res
    else:
        return Response(status= status.HTTP_403_FORBIDDEN)
@api_view(['GET'])
def view(request):
    token = request.COOKIES.get('token')
    if token == 'thisistoken':
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status= status.HTTP_401_UNAUTHORIZED)