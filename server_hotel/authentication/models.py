from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class StaffAccountsManager(BaseUserManager):
    def create_user(self,username,fullname,address,phone,identify,postnumber,password=None):
        if not username:
            raise ValueError('Empty username')
        if not fullname:
            raise ValueError('Empty fullname')
        if not address:
            raise ValueError('Empty address')
        if not phone:
            raise ValueError('Empty phone')
        if not identify:
            raise ValueError('Empty identify')
        if not postnumber:
            raise ValueError('Empty postnumber')
        user = self.model(
            username=username,
            fullname=fullname,
            address = address,
            phone = phone,
            identify = identify,
            postnumber = postnumber
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username,fullname,address,phone,identify,postnumber,password):
        user = self.create_user(
            username=username,
            fullname=fullname,
            address = address,
            phone = phone,
            identify = identify,
            postnumber = postnumber,
            password=password
        )

        user.is_admin = True
        user.is_superuser = True

        user.save(using=self._db)
        return user

class StaffAccounts(AbstractBaseUser):
    username = models.CharField(verbose_name='username',unique=True,max_length=50)
    fullname = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    identify = models.CharField(max_length=20)
    postnumber = models.CharField(max_length=20)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['fullname','address','phone','identify','postnumber']

    objects = StaffAccountsManager()

    def __str__(self):
        return self.username
    def has_perm(self,perm,Obj=None):
        return self.is_admin
    def has_module_perms(self,app_label):
        return True