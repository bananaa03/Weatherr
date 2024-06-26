# Generated by Django 5.0.4 on 2024-05-07 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('dataId', models.AutoField(primary_key=True, serialize=False)),
                ('temp', models.FloatField()),
                ('humid', models.FloatField()),
                ('rain', models.FloatField()),
                ('timestamp', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userId', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
                ('place', models.CharField(max_length=100)),
            ],
        ),
    ]
