#from django.shortcuts import render
#from pyrebase import pyrebase
#from datetime import datetime

# Firebase configuration
#config = {
#    "apiKey": "YOUR_API_KEY",
#    "authDomain": "YOUR_AUTH_DOMAIN",
#    "databaseURL": "YOUR_DATABASE_URL",
#    "projectId": "YOUR_PROJECT_ID",
#    "storageBucket": "YOUR_STORAGE_BUCKET",
#    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
#    "appId": "YOUR_APP_ID",
#}

# Initialize Firebase
#firebase = pyrebase.initialize_app(config)
#auth = firebase.auth()
#database = firebase.database()

#def index(request):
#    try:
#        data = database.child("data").get()

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
