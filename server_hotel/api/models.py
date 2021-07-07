# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import uuid
from django.conf import settings

class Categories(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=40)
    price = models.IntegerField()
    notes = models.CharField(max_length=200)

    class Meta:
        db_table = 'categories'


class Clients(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    fullname = models.CharField(max_length=50)
    phone = models.CharField(max_length=10, blank=True, null=True)
    email = models.CharField(max_length=50)
    identify = models.CharField(max_length=50)

    class Meta:
        db_table = 'clients'


class Roomrentals(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)


    room = models.ForeignKey('Rooms', models.DO_NOTHING, db_column='room')
    client = models.ForeignKey(Clients, models.DO_NOTHING, db_column='client')
    #staff = models.ForeignKey('Staffs', models.DO_NOTHING, db_column='staff')
    
    staff = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, db_column='staff')

    #created_at = models.CharField(max_length=20, blank=True, null=True)  
    created_at = models.DateTimeField()

    #start_at = models.CharField(max_length=20, blank=True, null=True)
    start_at = models.DateTimeField()
    
    #check_out_at = models.CharField(max_length=20, blank=True, null=True)
    check_out_at = models.DateTimeField()
    
    ###
    paid_at = models.DateTimeField(null=True)
    
    summary = models.IntegerField()

    class Meta:
        db_table = 'roomrentals'


class Rooms(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)


    category = models.ForeignKey(Categories, models.DO_NOTHING, db_column='category')
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status')
    floor = models.IntegerField()
    number = models.IntegerField()

    class Meta:
        db_table = 'rooms'


class Service(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)


    type = models.ForeignKey('Servicetypes', models.DO_NOTHING, db_column='type')
    rental = models.ForeignKey(Roomrentals, models.DO_NOTHING, db_column='rental')
    created_at = models.DateTimeField()
    is_canceled = models.CharField(max_length=5)
    quantity = models.IntegerField()
    sub_total = models.IntegerField()
    detail = models.CharField(max_length=150)

    class Meta:
        db_table = 'service'


class Servicetypes(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)

    id = models.UUIDField(primary_key=True, default= uuid.uuid4,editable=False)


    title = models.CharField(max_length=150)
    description = models.CharField(max_length=250)
    unit_price = models.IntegerField()

    class Meta:
        db_table = 'servicetypes'


# class Staffs(models.Model):
#     id = models.CharField(primary_key=True, max_length=50)
#     fullname = models.CharField(max_length=50)
#     postnumber = models.IntegerField()
#     email = models.CharField(max_length=50)
#     phone = models.CharField(max_length=10, blank=True, null=True)
#     identify = models.CharField(max_length=50)
#     address = models.CharField(max_length=50)
#     is_manager = models.CharField(max_length=5)

#     class Meta:
#         db_table = 'staffs'


class Status(models.Model):
    #id = models.CharField(primary_key=True, max_length=50)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)

    title = models.CharField(max_length=221)
    description = models.CharField(max_length=221)
    is_available = models.CharField(max_length=5)

    class Meta:
        db_table = 'status'
