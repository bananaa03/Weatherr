from django.shortcuts import render
import pandas as pd
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
        date_latest_timestamp=datetime.fromtimestamp(latest_timestamp)
        date_latest_timestamp=date_latest_timestamp.date()
        firebase_data.append({
            "timestamp": date_latest_timestamp,
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

    return JsonResponse({"temp":temp,"humid": humid,"rain": rain, "timestamp": date_latest_timestamp}, safe=False)
# render(request, 'index.html',{
#             "temp":temp,
#             "humid":humid,
#             "rain":rain,
#             "timestamp":timestamp
#         })    
# def __str__(self):
#       return latest_timestamp


def datadays(request):
    latest_data_list = []
    # Lặp qua tất cả dữ liệu từ Firebase để tìm 5 ngày gần nhất
    for date, data_list in daily_data.items():
        # Chỉ lấy bản ghi đầu tiên nếu có nhiều hơn một bản ghi cho cùng một ngày
        first_data = data_list[0]
        latest_data_list.append({
            "date": date,
            "data": first_data
        })

    # Sắp xếp danh sách bản ghi theo thời gian giảm dần và chỉ lấy 5 bản ghi đầu tiên
    latest_data_list = sorted(latest_data_list, key=lambda x: x["date"], reverse=True)[:5]

    firebase_data_days = []
    for day_data in latest_data_list:
        temp = day_data["data"].get("temp", None)
        humid = day_data["data"].get("humid", None)
        rain = day_data["data"].get("rain", None)
        firebase_data_days.append({
            "date": day_data["date"],
            "temp": temp,
            "humid": humid,
            "rain": rain
        })
    return JsonResponse(latest_data_list, safe=False)
    


def weather_prediction(request):
    if request.method == 'POST':
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
        csv_path = 'source/HCM.csv'
        df = pd.read_csv(csv_path)

        # Check if the date already exists in the dataset
        if context['date'] not in df['date'].values:
            # Append the new prediction to the DataFrame
            new_row = {
                'province': 'Ho Chi Minh City',
                'max': round(predictions[0][0]),
                'min': round(predictions[0][1]),
                'rain': round(predictions[0][3], 2),
                'humidi': round(predictions[0][2]),
                'date': predictions[0][3]
            }
            df = df.append(new_row, ignore_index=True)

            # Save the updated DataFrame back to the CSV
            df.to_csv(csv_path, index=False)
        return JsonResponse(context)
        # return render(request, 'weather_prediction.html', context)