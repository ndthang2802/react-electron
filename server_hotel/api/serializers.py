  
from rest_framework import serializers

from . import models

class CreateRoomRental(serializers.ModelSerializer):
    
    class Meta:
        model = models.Roomrentals
        fields = ['room', 'client','staff' ,'created_at', 'start_at', 'check_out_at', 'summary']

class CreateClient(serializers.ModelSerializer):

    class Meta:
        model = models.Clients
        fields = ['fullname', 'phone', 'email','identify']
        

class ChangeRoomStatus(serializers.ModelSerializer):
    
    class Meta:
        model = models.Clients
        fields = ['title', 'description', 'is_available']


class CreateServiceType(serializers.ModelSerializer):
    
    class Meta:
        model = models.Servicetypes
        fields = ['title', 'description', 'unit_price']

class CreateService(serializers.ModelSerializer):
    
    class Meta:
        model = models.Service
        fields = ['type','rental','created_at', 'is_canceled','quantity','sub_total', 'detail']