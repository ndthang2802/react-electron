# Generated by Django 3.2.5 on 2021-07-06 14:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('price', models.IntegerField()),
                ('notes', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fullname', models.CharField(max_length=50)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('email', models.CharField(max_length=50)),
                ('identify', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'clients',
            },
        ),
        migrations.CreateModel(
            name='Roomrentals',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
                ('start_at', models.DateTimeField()),
                ('check_out_at', models.DateTimeField()),
                ('paid_at', models.DateTimeField(null=True)),
                ('summary', models.IntegerField()),
                ('client', models.ForeignKey(db_column='client', on_delete=django.db.models.deletion.DO_NOTHING, to='api.clients')),
            ],
            options={
                'db_table': 'roomrentals',
            },
        ),
        migrations.CreateModel(
            name='Servicetypes',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=250)),
                ('unit_price', models.IntegerField()),
            ],
            options={
                'db_table': 'servicetypes',
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=221)),
                ('description', models.CharField(max_length=221)),
                ('is_available', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'status',
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
                ('is_canceled', models.CharField(max_length=5)),
                ('quantity', models.IntegerField()),
                ('sub_total', models.IntegerField()),
                ('detail', models.CharField(max_length=150)),
                ('rental', models.ForeignKey(db_column='rental', on_delete=django.db.models.deletion.DO_NOTHING, to='api.roomrentals')),
                ('type', models.ForeignKey(db_column='type', on_delete=django.db.models.deletion.DO_NOTHING, to='api.servicetypes')),
            ],
            options={
                'db_table': 'service',
            },
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('floor', models.IntegerField()),
                ('number', models.IntegerField()),
                ('category', models.ForeignKey(db_column='category', on_delete=django.db.models.deletion.DO_NOTHING, to='api.categories')),
                ('status', models.ForeignKey(db_column='status', on_delete=django.db.models.deletion.DO_NOTHING, to='api.status')),
            ],
            options={
                'db_table': 'rooms',
            },
        ),
        migrations.AddField(
            model_name='roomrentals',
            name='room',
            field=models.ForeignKey(db_column='room', on_delete=django.db.models.deletion.DO_NOTHING, to='api.rooms'),
        ),
        migrations.AddField(
            model_name='roomrentals',
            name='staff',
            field=models.ForeignKey(db_column='staff', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
