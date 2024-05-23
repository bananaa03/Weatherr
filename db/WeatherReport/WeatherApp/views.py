from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import generics
from WeatherApp.models import Data
from WeatherApp.serializers import DataSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.core.files.storage import default_storage
# Create your views here.
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


@csrf_exempt
def SaveFile(request):
    file=request.FILES['myFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)

def index(request):
    return render(request, 'index.html')
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]