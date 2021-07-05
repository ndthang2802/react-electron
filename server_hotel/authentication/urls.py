from django.contrib import admin
from django.urls import path,re_path
from . import views


urlpatterns = [
    path('profile', views.profile, name='profile'),
    path('token/', views.login_view, name='token'),
    path('refresh_token/', views.refresh_token_view, name='refreshtoken'),
    path('logout/', views.logout, name='logout'),

]