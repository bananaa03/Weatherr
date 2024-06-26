import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const HumidityChart = () => {
  const [humidityData, setHumidityData] = useState(null);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Truy vấn API hoặc dịch vụ dự báo thời tiết ở đây
    // Đoạn mã này chỉ là một ví dụ giả định

    // Mock data
    const mockData = {
      labels: ["8 tháng 5", "9 tháng 5", "10 tháng 5", "11 tháng 5", "12 tháng 5"],
      datasets: [
        {
          label: "Humidity",
          data: [56, 59, 59, 60, 61.76], // Dữ liệu độ ẩm (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4"
        },
      ],
    };

    setHumidityData(mockData); // Cập nhật state với dữ liệu giả định
  }, []);

  useEffect(() => {
    // Vẽ biểu đồ khi humidityData có dữ liệu
    if (humidityData) {
      const ctx = document.getElementById("humidityChart").getContext("2d");

      // Check if previous chart instance exists and destroy it
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart instance and store it in the ref
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: humidityData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [humidityData]);

  return (
    <div className="chartContainer">
      <canvas id="humidityChart"></canvas>
    </div>
  );
};

export default HumidityChart;
