from django.shortcuts import render
from typing import List
from django.shortcuts import render
from django.http import HttpResponse, response
from jwt.api_jwt import PyJWT
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
import json
from .models import *
from django.http import JsonResponse
from django.db.models import F
from rest_framework.permissions import AllowAny

# Create your views here.


@api_view(['GET'])
def view(request):
    token = request.COOKIES.get('token')
    if token == 'thisistoken':
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status= status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
@permission_classes([AllowAny])
def getClientByPhone(request,phone):
    res = list(Clients.objects.filter(phone=phone).values())
    return  JsonResponse(res,safe=False)
@api_view(['GET'])
def dontknowhowtoname(request):
    info = list(Roomrentals.objects.select_related().filter(room__status__is_available='false').values(name=F('client__fullname'),
                                                                                                    phone=F('client__phone'),
                                                                                                    floor=F('room__floor'),
                                                                                                    number=F('room__number'),
                                                                                                    Start_at=F('start_at'),Check_out_at=F('check_out_at'),
                                                                                                    id_room=F('room__id') ))
                                                                                                
    return  JsonResponse(info,safe=False)

# room rental
@api_view(['GET','POST'])
def roomRental(request):
    if request.method == 'GET':
        rental = list(Roomrentals.objects.values())
        return  JsonResponse(rental,safe=False)
    # add booking
    elif request.method == 'POST':
        print(request.COOKIES)
        print(request.headers)
        data = json.loads(json.dumps(request.POST))
        return JsonResponse(data,safe=False)



@api_view(['GET'])
@permission_classes([AllowAny])
def getAvailableRooms(request):
    c = Rooms.objects.select_related().filter(status__is_available='true')
    c = list(c.values(id_room=F('id'),Category=F('category__name'),Price=F('category__price'),Floor=F('floor'),Number=F('number') ))
    return  JsonResponse(c,safe=False)

#get room by id
@api_view(['GET'])
def getRoomById(request,id):
    info = list(Rooms.objects.select_related().filter(id=id).values(Number=F('number'),Floor=F('floor'),Category=F('category__name'),Price=F('category__price') ))
    return JsonResponse(info,safe=False)



