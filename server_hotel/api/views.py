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
from django.contrib.auth import get_user_model
from . import serializers
import datetime
# Create your views here.




#-----------------------API thêm để render -----------------------------#

# dữ liệu để render trong trang booking 
@api_view(['GET'])
def BookingRender(request):
    info = list(Roomrentals.objects.select_related().filter(room__status__is_available='false').values(name=F('client__fullname'),
                                                                                                    phone=F('client__phone'),
                                                                                                    floor=F('room__floor'),
                                                                                                    number=F('room__number'),
                                                                                                    Start_at=F('start_at'),Check_out_at=F('check_out_at'),
                                                                                                    id_room=F('room__id'),id_rental=F('id')   ))
    return  JsonResponse(info,safe=False)
# dữ liệu để render trong trang service 
@api_view(['GET'])
@permission_classes([AllowAny]) # remove this 
def ServiceRender(request):
    info = list(Service.objects.select_related().filter(is_canceled='false').values(Type=F('type__title'),
                                                                                    Unit_price=F('type__unit_price'),
                                                                                    Created_at=F('created_at'),
                                                                                    Quantity=F('quantity'),
                                                                                    Sub_total=F('sub_total'),
                                                                                    Detail=F('detail'),
                                                                                    Id=F('id') ))
    return  JsonResponse(info,safe=False)
# dữ liệu render khi thanh toán
@api_view(['POST'])
@permission_classes([AllowAny]) # remove this 
def UnPaidBill(request):
    client_phone_number = request.data['phone']
    client_id = Clients.objects.get(phone=client_phone_number)

    client_rental = list(Roomrentals.objects.select_related().filter(client=client_id).values(name=F('client__fullname'),
                                                                                                    phone=F('client__phone'),
                                                                                                    floor=F('room__floor'),
                                                                                                    number=F('room__number'),
                                                                                                    Start_at=F('start_at'),Check_out_at=F('check_out_at'),
                                                                                                    id_room=F('room__id'),id_rental=F('id')))
    client_unpaid_rental = [rental for rental in client_rental if datetime.datetime.strptime(rental['Check_out_at'], '%d/%m/%Y') >= datetime.datetime.now() ]
    
    
    return JsonResponse(client_unpaid_rental,safe=False)


#-----------------------API liên quan tới room client -----------------------------#

# lấy thông tin client từ số điện thoại
@api_view(['GET'])
def getClientByPhone(request,phone):
    res = list(Clients.objects.filter(phone=phone).values())
    return  JsonResponse(res,safe=False)

#-----------------------API liên quan tới room rentals -----------------------------#

# room rental
@api_view(['GET','POST','PATCH'])
#@permission_classes([AllowAny]) # remove this 
def room_rentals(request):
    if request.method == 'GET':
        rental = list(Roomrentals.objects.values())
        return  JsonResponse(rental,safe=False)
    # add booking
    elif request.method == 'POST':   
        #current day 
        x = datetime.datetime.now()
        y = x.year
        m = x.month
        d = x.day

        room_rental = {}
        room_rental['room'] = request.data['room']
        customer = list(Clients.objects.filter(phone=request.data['phone']).values()) # kiểm tra xem khách hàng tồn tại ko
        if not len(customer):
            # nếu không tồn tại thì tạo client mới
            client = {}
            client['fullname'] = request.data['name']
            client['phone'] = request.data['phone']
            client['email'] = request.data['email']
            client['identify'] = request.data['identify']
            client_serializer = serializers.CreateClient(data=client)
            if client_serializer.is_valid():
                client_serializer.save()
                new_client = list(Clients.objects.filter(phone=request.data['phone']).values())
                room_rental['client'] = new_client[0]['id']
            else:
                return Response(client_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
            room_rental['client'] = str(customer[0]['id'])
        room_rental['staff'] =  request.user.id # id của staff đang đăng nhập để thực hiện booking
        room_rental['created_at'] = str(m) + '/' + str(d) + '/' + str(y)
        
        date_rq_ci_str = datetime.datetime.strptime(request.data['start_at'], "%Y-%m-%d").strftime("%d/%m/%Y")

        
        room_rental['start_at'] = date_rq_ci_str
        
        date_rq_co_str = datetime.datetime.strptime(request.data['check_out_at'], "%Y-%m-%d").strftime("%d/%m/%Y")
        
        room_rental['check_out_at'] = date_rq_co_str
        room_rental['summary'] = 0  # Chỉnh lại thành số ngày thuê * giá phòng 


        room_rental_serializer = serializers.CreateRoomRental(data=room_rental)
        if room_rental_serializer.is_valid():
            # tạo booking mới
            room_rental_serializer.save()
            # cập nhật lại status phòng vừa được thuê
            this_room = list(Rooms.objects.filter(id=request.data['room']).values())
            room_status = Status.objects.get(id=this_room[0]['status_id'])
            room_status.is_available = 'False'
            room_status.save()
            return Response(room_rental_serializer.data, status=status.HTTP_201_CREATED)
        return Response(room_rental_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # edit booking (cho phép edit thông tin người đặt và ngày check_out)
    elif request.method == 'PATCH':
        client = {}
        
        rental_update = Roomrentals.objects.get(id = request.data['id_rental'])    
        
        date_rq_str = datetime.datetime.strptime(request.data['check_out_at'], "%Y-%m-%d").strftime("%d/%m/%Y") # date dạng string
        date_rq_dt = datetime.datetime.strptime(date_rq_str, '%d/%m/%Y') # date time

        client['fullname'] = request.data['name']
        client['phone'] = request.data['phone']
        client['email'] = request.data['email']
        client['identify'] = request.data['identify']

        if date_rq_dt > datetime.datetime.now() and serializers.CreateClient(data=client).is_valid(): 
            rental_update.check_out_at = date_rq_str
            rental_update.save()
        
            client_update = Clients.objects.get(id=rental_update.client.id)
            client_update.name = request.data['name']
            client_update.phone = request.data['phone']
            client_update.email = request.data['email']
            client_update.identify = request.data['identify']
            client_update.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)
            
#-----------------------API liên quan tới room -----------------------------#

# lấy tất cả các phòng có thể đặt được (status.is_available = 'true')
@api_view(['GET'])
def getAvailableRooms(request):
    c = Rooms.objects.select_related().filter(status__is_available='true')
    c = list(c.values(id_room=F('id'),Category=F('category__name'),Price=F('category__price'),Floor=F('floor'),Number=F('number') ))
    return  JsonResponse(c,safe=False)

# lấy thông tin phòng bằng id
@api_view(['GET'])
def getRoomById(request,id):
    info = list(Rooms.objects.select_related().filter(id=id).values(Number=F('number'),Floor=F('floor'),Category=F('category__name'),Price=F('category__price') ))
    return JsonResponse(info,safe=False)


#-----------------------API liên quan tới service -----------------------------#

# service type
@api_view(['GET','POST'])
@permission_classes([AllowAny]) # remove this 
def getServiceType(request):
    if request.method == 'GET': # lấy tất cả service types
        result = list(Servicetypes.objects.values(Tittle=F('title'),Description=F('description'),Unit_Price=F('unit_price')))
        return JsonResponse(result,safe=False)
    if request.method == 'POST': # tạo 1 service types mới
        data = request.data
        service_type_serializer = serializers.CreateServiceType(data=data)
        if service_type_serializer.is_valid():
            service_type_serializer.save()
            return Response(service_type_serializer.data,status=status.HTTP_201_CREATED)
        return Response(service_type_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# service 
@api_view(['GET','POST'])
@permission_classes([AllowAny]) # remove this 
def getServiceType(request):
    if request.method == 'GET': # lấy  50  service 
        result = list(Servicetypes.objects.order_by('created_at').values())[:50]
        return JsonResponse(result,safe=False)
    if request.method == 'POST': # tạo 1 service types mới
        # current date
        x = datetime.datetime.now()
        y = x.year
        m = x.month
        d = x.day

        service_created = {}

        service_created['type'] = request.data['type']
        service_created['rental'] = request.data['rental']
        service_created['created_at'] = str(m) + '/' + str(d) + '/' + str(y)
        service_created['is_canceled'] = 'false'
        service_created['quantity'] = request.data['quantity']
        service_created['sub_total'] = 0 # service type price * quantity
        service_created['detail'] = request.data['detail']

        service_serializer = serializers.CreateService(data=service_created)

        if service_serializer.is_valid():
            service_serializer.save()
            return Response(service_serializer.data,status=status.HTTP_201_CREATED)
        return Response(service_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

