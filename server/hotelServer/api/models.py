# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Categories(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    notes = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'CATEGORIES'


class Clients(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    fullname = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    identify = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'CLIENTS'


class Roomrentals(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    room = models.ForeignKey('Rooms', models.DO_NOTHING, db_column='room', blank=True, null=True)
    client = models.ForeignKey(Clients, models.DO_NOTHING, db_column='client', blank=True, null=True)
    staff = models.ForeignKey('Staffs', models.DO_NOTHING, db_column='staff', blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    start_at = models.DateField(blank=True, null=True)
    check_out_at = models.DateField(blank=True, null=True)
    summary = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'ROOMRENTALS'


class Rooms(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    category = models.ForeignKey(Categories, models.DO_NOTHING, db_column='category', blank=True, null=True)
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status', blank=True, null=True)
    floor = models.IntegerField(blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'ROOMS'


class Services(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    type = models.ForeignKey('Servicetypes', models.DO_NOTHING, db_column='type', blank=True, null=True)
    rental = models.ForeignKey(Roomrentals, models.DO_NOTHING, db_column='rental', blank=True, null=True)
    created_at = models.DateField(blank=True, null=True)
    is_canceled = models.CharField(max_length=50, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    sub_total = models.IntegerField(blank=True, null=True)
    detail = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        db_table = 'SERVICES'


class Servicetypes(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    title = models.TextField(blank=True, null=True)  # This field type is a guess.
    description = models.TextField(blank=True, null=True)  # This field type is a guess.
    unit_price = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'SERVICETYPES'


class Staffs(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    fullname = models.CharField(max_length=50, blank=True, null=True)
    postnumber = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    identify = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    is_manager = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'STAFFS'


class Status(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    title = models.TextField(blank=True, null=True)  # This field type is a guess.
    description = models.TextField(blank=True, null=True)  # This field type is a guess.
    is_available = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'STATUS'
