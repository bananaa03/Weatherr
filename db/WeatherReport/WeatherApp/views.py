from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from WeatherApp.models import Data 
from WeatherApp.serializers import DataSerializer,UserSerializer

from django.core.files.storage import default_storage

from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserRegisterTokenSerializer, UserSerializer, DataSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Data


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView  

from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes


from rest_framework_simplejwt.views import TokenObtainPairView # for login page
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
# Create your views here.
@csrf_exempt
def dataApi(request, id=0):
    if request.method == 'GET':
        datas = Data.objects.all()
        datas_serializer = DataSerializer(datas, many=True)
        return JsonResponse(datas_serializer.data, safe=False)

    elif request.method == 'POST':
        data_data = JSONParser().parse(request)
        data_serializer = DataSerializer(data=data_data)
        if data_serializer.is_valid():
            data_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        data_data = JSONParser().parse(request)
        data = Data.objects.get(dataId=data_data['dataId'])
        data_serializer = DataSerializer(data, data=data_data)
        if data_serializer.is_valid():
            data_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        data = Data.objects.get(dataId=id)
        data.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserRegisterView(APIView):
    """To Register the User"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        data = request.data # holds username and password (in dictionary)
        username = data["username"]
        email = data["email"]

        if username == "" or email == "":
            return Response({"detial": "username or email cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            check_username = User.objects.filter(username=username).count()
            check_email =  User.objects.filter(email=email).count()

            if check_username:
                message = "A user with that username already exist!"
                return Response({"detail": message}, status=status.HTTP_403_FORBIDDEN)
            if check_email:
                message = "A user with that email address already exist!"
                return Response({"detail": message}, status=status.HTTP_403_FORBIDDEN)
            else:
                user = User.objects.create(
                    username=username,
                    email=email,
                    password=make_password(data["password"]),
                )
                serializer = UserRegisterTokenSerializer(user, many=False)
                return Response(serializer.data)

# login user (customizing it so that we can see fields like username, email etc as a response 
# from server, otherwise it will only provide access and refresh token)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserRegisterTokenSerializer(self.user).data

        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# get user details
class UserAccountDetailsView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except:
            return Response({"details": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# update user account
class UserAccountUpdateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        data = request.data

        if user:
            if request.user.id == user.id:
                user.username = data["username"]
                user.email = data["email"]

                if data["password"] != "":
                    user.password = make_password(data["password"])

                user.save()
                serializer = UserSerializer(user, many=False)
                message = {"details": "User Successfully Updated.", "user": serializer.data}
                return Response(message, status=status.HTTP_200_OK)
            else:
                return Response({"details": "Permission Denied."}, status.status.HTTP_403_FORBIDDEN)
        else:
            return Response({"details": "User not found."}, status=status.HTTP_404_NOT_FOUND)


# delete user account
class UserAccountDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        try:
            user = User.objects.get(id=pk)
            data = request.data

            if request.user.id == user.id:
                if check_password(data["password"], user.password):
                    user.delete()
                    return Response({"details": "User successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({"details": "Incorrect password."}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"details": "Permission Denied."}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"details": "User not found."}, status=status.HTTP_404_NOT_FOUND)
#dât view
class DataListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # show stripe cards of only that user which is equivalent 
        #to currently logged in user
        Data = Data.objects.filter(user=request.user)
        serializer = DataSerializer(Data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
