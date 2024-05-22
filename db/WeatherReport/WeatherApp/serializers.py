from rest_framework import serializers
from WeatherApp.models import Data, Users

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields=('dataId',
                'temp',
                'humid',
                'rain',
                'timestamp')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields=(
            'userId',
            'email',
            'password',
        )