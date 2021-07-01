
from django.contrib import admin
from django.urls import path,re_path
from . import views


urlpatterns = [
    
    #get room rentals or post : add a booking
    re_path(r'^roomrental/$', views.roomRental),
    #get available rooms
    re_path(r'^availablerooms/$', views.getAvailableRooms),
    #get client by phone
    re_path(r'^client/(?P<phone>\d+)/$', views.getClientByPhone),
    #data for render booking
    re_path(r'^renderbooking/$', views.dontknowhowtoname),
    #get room by id
    re_path(r'^room/(?P<id>[a-zA-Z0-9]+)/$', views.getRoomById ),

]
