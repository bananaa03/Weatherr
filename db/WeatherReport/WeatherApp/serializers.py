from rest_framework import serializers
from WeatherApp.models import Data
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields=('dataId',
                'temp',
                'humid',
                'rain',
                'timestamp')
class UserSerializer(serializers.ModelSerializer):
    admin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ["id", "username", "password","email", "admin"]

    def get_admin(self, obj):
        return obj.is_staff
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
class UserRegisterTokenSerializer(UserSerializer):
        token = serializers.SerializerMethodField(read_only=True)

        class Meta:
            model = User
            fields = ["id", "username", "email", "admin", "token"]

        def get_token(self, obj):
            token = RefreshToken.for_user(obj)
            return str(token.access_token)