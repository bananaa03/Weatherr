from django.db import models
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
class WeatherPredictionModel(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()
    max = models.FloatField()
    min = models.FloatField()
    humidi = models.FloatField()
    rain = models.FloatField()

    @classmethod
    def train_model(cls):
        # Đọc dữ liệu từ file CSV
        df = pd.read_csv('D:/semesters_6/weather/db/WeatherReport/Data/source/HCM.csv')

        # Chuyển đổi cột 'date' thành định dạng datetime
        df['date'] = pd.to_datetime(df['date'])

        # Thêm các đặc trưng thời gian
        df['year'] = df['date'].dt.year
        df['month'] = df['date'].dt.month
        df['day'] = df['date'].dt.day

        # Loại bỏ cột 'province' và 'date' vì chúng không cần thiết cho mô hình
        df = df.drop(['province', 'date'], axis=1)

        # Xác định features và targets
        X = df[['year', 'month', 'day']]
        y = df[['max', 'min', 'humidi', 'rain']]

        # Chia dữ liệu thành tập huấn luyện và tập kiểm tra
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=35)

        # Định nghĩa mô hình Random Forest
        model = MultiOutputRegressor(RandomForestRegressor(random_state=35))

        # Tinh chỉnh siêu tham số của mô hình
        param_grid = {
            'estimator__n_estimators': [100, 200, 300],
            'estimator__max_depth': [None, 10, 20],
            'estimator__min_samples_split': [2, 5, 10],
            'estimator__min_samples_leaf': [1, 2, 4]
        }

        # Tạo GridSearchCV object
        grid_search = GridSearchCV(model, param_grid, cv=5, n_jobs=-1)

        # Tiến hành tinh chỉnh trên dữ liệu huấn luyện
        grid_search.fit(X_train, y_train)
        # Lấy ra mô hình có hiệu suất tốt nhất từ grid search
        best_model = grid_search.best_estimator_

        # Huấn luyện mô hình tốt nhất
        best_model.fit(X_train, y_train)

        # # Dự đoán trên tập kiểm tra
        # y_pred = best_model.predict(X_test)
        return best_model