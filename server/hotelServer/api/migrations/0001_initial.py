# Generated by Django 3.2.4 on 2021-06-30 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('notes', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'CATEGORIES',
            },
        ),
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fullname', models.CharField(blank=True, max_length=50, null=True)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('identify', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'CLIENTS',
            },
        ),
        migrations.CreateModel(
            name='Roomrentals',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('created_at', models.DateField(blank=True, null=True)),
                ('start_at', models.DateField(blank=True, null=True)),
                ('check_out_at', models.DateField(blank=True, null=True)),
                ('summary', models.IntegerField(blank=True, null=True)),
                ('client', models.ForeignKey(blank=True, db_column='client', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.clients')),
            ],
            options={
                'db_table': 'ROOMRENTALS',
            },
        ),
        migrations.CreateModel(
            name='Servicetypes',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('unit_price', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'SERVICETYPES',
            },
        ),
        migrations.CreateModel(
            name='Staffs',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fullname', models.CharField(blank=True, max_length=50, null=True)),
                ('postnumber', models.IntegerField(blank=True, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('identify', models.CharField(blank=True, max_length=50, null=True)),
                ('address', models.CharField(blank=True, max_length=50, null=True)),
                ('is_manager', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'STAFFS',
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_available', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'STATUS',
            },
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('created_at', models.DateField(blank=True, null=True)),
                ('is_canceled', models.CharField(blank=True, max_length=50, null=True)),
                ('quantity', models.IntegerField(blank=True, null=True)),
                ('sub_total', models.IntegerField(blank=True, null=True)),
                ('detail', models.TextField(blank=True, null=True)),
                ('rental', models.ForeignKey(blank=True, db_column='rental', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.roomrentals')),
                ('type', models.ForeignKey(blank=True, db_column='type', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.servicetypes')),
            ],
            options={
                'db_table': 'SERVICES',
            },
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('floor', models.IntegerField(blank=True, null=True)),
                ('number', models.IntegerField(blank=True, null=True)),
                ('category', models.ForeignKey(blank=True, db_column='category', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.categories')),
                ('status', models.ForeignKey(blank=True, db_column='status', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.status')),
            ],
            options={
                'db_table': 'ROOMS',
            },
        ),
        migrations.AddField(
            model_name='roomrentals',
            name='room',
            field=models.ForeignKey(blank=True, db_column='room', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.rooms'),
        ),
        migrations.AddField(
            model_name='roomrentals',
            name='staff',
            field=models.ForeignKey(blank=True, db_column='staff', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.staffs'),
        ),
    ]
