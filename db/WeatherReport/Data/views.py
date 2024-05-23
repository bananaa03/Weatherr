from django.shortcuts import render
import pyrebase
from datetime import datetime
from Data.models import WeatherPredictionModel

from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from collections import defaultdict
from operator import itemgetter
from django.http.response import JsonResponse



config={
    "apiKey": "AIzaSyBe9ELx7p357VOvfvEvMFXxhkQmZ2BW79c",
    "authDomain": "projectiot-nt532.firebaseapp.com",
    "databaseURL": "https://projectiot-nt532-default-rtdb.firebaseio.com",
    "projectId": "projectiot-nt532",
    "storageBucket": "projectiot-nt532.appspot.com",
    "messagingSenderId": "947744067875",
    "appId": "1:947744067875:web:e706435759a29868c13c96",
    # measurementId: "G-SRX5SDN8PR"
}
# Initialize Firebase
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
database = firebase.database()

#def index(request):
#    try:
#        data = database.child("data").get()

data=database.child("data").get()

firebase_data = []
latest_timestamp = 0
latest_data = None

daily_data = defaultdict(list)
# Lặp qua các mục dữ liệu từ Firebase và phân loại chúng theo ngày
for timestamp_key, timestamp_data in data.val().items():
    timestamp = int(timestamp_key)
    date = datetime.fromtimestamp(timestamp).date()
    daily_data[date].append(timestamp_data)

#latest data
for timestamp_key, timestamp_data in data.val().items():
        timestamp = int(timestamp_key)
        if timestamp > latest_timestamp:
            latest_timestamp = timestamp
            latest_data = timestamp_data

for document_id, document_data in latest_data.items():
        temp = document_data["temp"]
        humid = document_data["humid"]
        rain = document_data["rain"]
        firebase_data.append({
            "timestamp": latest_timestamp,
            "document_id": document_id,
            "temp": temp,
            "humid": humid,
            "rain": rain
        })    

def index(request):
    timestamp=datetime.fromtimestamp(latest_timestamp).day
    print(f"Nhiệt độ: {temp}")
    print(f"Độ ẩm: {humid}")
    print(f"Lượng mưa: {rain}")

    return render(request, 'index.html',{
            "temp":temp,
            "humid":humid,
            "rain":rain,
            "timestamp":timestamp
        })    
# def __str__(self):
#       return latest_timestamp


def datadays(request):
    latest_data_list = []
    # Lặp qua tất cả dữ liệu từ Firebase để tìm 5 ngày gần nhất
    for timestamp_key, timestamp_data in data.val().items():
        timestamp = int(timestamp_key)
        # Tạo một dict chứa timestamp và dữ liệu của ngày hiện tại
        current_day_data = {"timestamp": timestamp, "data": timestamp_data}
        
        # Kiểm tra xem danh sách latest_data_list đã đủ 5 ngày chưa
        if len(latest_data_list) < 5:
            latest_data_list.append(current_day_data)
        else:
            # Nếu đã đủ 5 ngày, thì tìm ngày có timestamp nhỏ nhất trong 5 ngày và thay thế bằng ngày hiện tại nếu timestamp của ngày hiện tại lớn hơn
            min_timestamp_index = min(range(len(latest_data_list)), key=lambda i: latest_data_list[i]["timestamp"])
            if timestamp > latest_data_list[min_timestamp_index]["timestamp"]:
                latest_data_list[min_timestamp_index] = current_day_data

    firebase_data_days = []
    latest_data_list=sorted(latest_data_list, key=lambda x: x["timestamp"], reverse=True)
    for day_data in latest_data_list:
        temp = day_data["data"].get("temp", None)
        humid = day_data["data"].get("humid", None)
        rain = day_data["data"].get("rain", None)
        timestamp = day_data["timestamp"]

        if temp is not None and humid is not None and rain is not None and timestamp is not None:
            firebase_data_days.append({
                "date": datetime.fromtimestamp(timestamp).date(),
                "day": datetime.fromtimestamp(timestamp).day,
                "temp": temp,
                "humid": humid,
                "rain": rain
            })
    return JsonResponse(latest_data_list, safe=False)
    


def weather_prediction(request):
    # if request.method == 'GET':
        timestamp = latest_timestamp
        year = datetime.fromtimestamp(timestamp).year
        month = datetime.fromtimestamp(timestamp).month
        day =  datetime.fromtimestamp(timestamp).day

        # Huấn luyện mô hình nếu cần thiết
        model = WeatherPredictionModel.train_model()

        # Dự đoán với dữ liệu mới
        new_data = [[year, month, day]]
        predictions = model.predict(new_data)

        # # Lưu dự đoán vào cơ sở dữ liệu
        # weather_prediction = WeatherPredictionModel(
        #     year=year,
        #     month=month,
        #     day=day,
        #     max_predicted=predictions[0][0],
        #     min_predicted=predictions[0][1],
        #     humidi_predicted=predictions[0][2],
        #     rain_predicted=predictions[0][3]
        # )
        # weather_prediction.save()

        # Trả về kết quả dự đoán
        context = {
            'year': year,
            'month': month,
            'day': day,
            'max': predictions[0][0],
            'min': predictions[0][1],
            'humidi': predictions[0][2],
            'rain': predictions[0][3]
        }
        return render(request, 'weather_prediction.html', context)

    # return render(request, 'weather_prediction.html')

# @csrf_exempt
# def SaveFile(request):
#     file=request.FILES['myFile']
#     file_name = default_storage.save(file.name,file)
#     return JsonResponse(file_name,safe=False)
#        if data.val() is None:
#            raise ValueError("No data available in the database")

#        latest_timestamp = 0
#        latest_data = None

        # Find the latest timestamp and corresponding data
#        for timestamp_key, timestamp_data in data.val().items():
#            timestamp = int(timestamp_key)
#            if timestamp > latest_timestamp:
#                latest_timestamp = timestamp
#                latest_data = timestamp_data

#        if not latest_data:
#            raise ValueError("No data found for the latest timestamp")

        # Assuming there's only one document_id per timestamp
#        for document_id, document_data in latest_data.items():
#            temp = document_data.get("temp", "N/A")
#            humid = document_data.get("humid", "N/A")
#            rain = document_data.get("rain", "N/A")
#            break

#        timestamp = datetime.fromtimestamp(latest_timestamp)

#        context = {
#            "temp": temp,
#            "humid": humid,
#            "rain": rain,
#            "timestamp": timestamp,
#        }

#       print(f"Nhiệt độ: {temp}")
#        print(f"Độ ẩm: {humid}")
#        print(f"Lượng mưa: {rain}")

#    except Exception as e:
#        context = {
#            "error": str(e)
#        }
#        print(f"Error: {str(e)}")

#    return render(request, 'index.html', context)
