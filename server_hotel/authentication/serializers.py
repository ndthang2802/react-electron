from rest_framework import serializers
from .models import StaffAccounts


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffAccounts
        fields = ['id','username',
                  'fullname', 'is_active','is_staff','is_admin','is_superuser','address','phone','identify','postnumber']