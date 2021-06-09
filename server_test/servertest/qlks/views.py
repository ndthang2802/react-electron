from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
@api_view(['POST'])
def authentication(request):
    # if request.POST.username == 'testuser' and request.POST.password == 'secret':
    #     return Response('Thisistoken')
    # else:
    #     return {'fail':'fail'}
    return Response({'token':'test'})
@api_view(['GET'])
def view(request):
    return Response({'a':'asd'})