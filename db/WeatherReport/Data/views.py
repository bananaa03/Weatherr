from django.shortcuts import render
import pyrebase
from datetime import datetime
# Create your views here.


config={
    "apiKey": "AIzaSyBe9ELx7p357VOvfvEvMFXxhkQmZ2BW79c",
    "authDomain": "projectiot-nt532.firebaseapp.com",
    "databaseURL": "https://projectiot-nt532-default-rtdb.firebaseio.com",
    "projectId": "projectiot-nt532",
    "storageBucket": "projectiot-nt532.appspot.com",
    "messagingSenderId": "947744067875",
    "appId": "1:947744067875:web:e706435759a29868c13c96",
    # "measurementId": "G-SRX5SDN8PR"
}

firebase =pyrebase.initialize_app(config)
authe=firebase.auth()
database=firebase.database()


def index(request):
    data=database.child("data").get()

    firebase_data = []
    latest_timestamp = 0
    latest_data = None

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
    timestamp=datetime.fromtimestamp(latest_timestamp)
    print(f"Nhiệt độ: {temp}")
    print(f"Độ ẩm: {humid}")
    print(f"Lượng mưa: {rain}")

    return render(request, 'index.html',{
            "temp":temp,
            "humid":humid,
            "rain":rain,
            "timestamp":timestamp
        })    
