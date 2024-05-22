from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from WeatherApp.models import Data,Users
from WeatherApp.serializers import DataSerializer,UserSerializer

from django.core.files.storage import default_storage

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

# @csrf_exempt
# def employeeApi(request,id=0):
#     if request.method=='GET':
#         employees = Employees.objects.all()
#         employees_serializer = EmployeeSerializer(employees, many=True)
#         return JsonResponse(employees_serializer.data, safe=False)

#     elif request.method=='POST':
#         employee_data=JSONParser().parse(request)
#         employee_serializer = EmployeeSerializer(data=employee_data)
#         if employee_serializer.is_valid():
#             employee_serializer.save()
#             return JsonResponse("Added Successfully!!" , safe=False)
#         return JsonResponse("Failed to Add.",safe=False)
    
#     elif request.method=='PUT':
#         employee_data = JSONParser().parse(request)
#         employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
#         employee_serializer=EmployeeSerializer(employee,data=employee_data)
#         if employee_serializer.is_valid():
#             employee_serializer.save()
#             return JsonResponse("Updated Successfully!!", safe=False)
#         return JsonResponse("Failed to Update.", safe=False)

#     elif request.method=='DELETE':
#         employee=Employees.objects.get(EmployeeId=id)
#         employee.delete()
#         return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def SaveFile(request):
    file=request.FILES['myFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)