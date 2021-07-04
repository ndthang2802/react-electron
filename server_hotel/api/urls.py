
from django.contrib import admin
from django.urls import path,re_path
from . import views


urlpatterns = [
    
    #----------------  ROOMRENTALS MODEL ------------------#
    
    # 1. Room rentals - (GET,POST)
    re_path(r'^room_rental/$', views.room_rentals),
    

    #----------------  ROOMS MODEL ------------------#

    # 1. Các phòng đang available
    re_path(r'^availablerooms/$', views.getAvailableRooms),
    # 2. Thông tin phòng từ id
    re_path(r'^room/(?P<id>[a-zA-Z0-9]+)/$', views.getRoomById ),
    
    
    #----------------  CLIENTS MODEL ------------------#
    
    # 1. Thông tin client từ phone
    re_path(r'^client/(?P<phone>\d+)/$', views.getClientByPhone),

    #----------------  SERVICE MODEL ------------------#
    
    # 1. service types - (GET,POST)
    re_path(r'^service/types/$', views.getServiceType ),

    

    #----------------  FOR RENDER ------------------#
    
    # 1. Data for render booking
    re_path(r'^renderbooking/$', views.BookingRender),
    # 2. Data for render service
    re_path(r'^renderservice/$', views.ServiceRender),
    # 3. Get unpaid bill
    re_path(r'^unpaidbill/$', views.UnPaidBill),

    

]