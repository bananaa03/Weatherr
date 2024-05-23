import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const TemperatureChart = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Truy vấn API hoặc dịch vụ dự báo thời tiết ở đây
    // Đoạn mã này chỉ là một ví dụ giả định

    // Mock data
    const mockData = {
      labels: ["8 tháng 5", "9 tháng 5", "10 tháng 5", "11 tháng 5", "12 tháng 5"],
      datasets: [
        {
          label: "Temperature",
          data: [35, 35.3, 34, 33.6, 34], // Dữ liệu nhiệt độ (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4"
        },
      ],
    };

    setTemperatureData(mockData); // Cập nhật state với dữ liệu giả định
  }, []);

  useEffect(() => {
    // Vẽ biểu đồ khi temperatureData có dữ liệu
    if (temperatureData) {
      const ctx = document.getElementById("temperatureChart").getContext("2d");

      // Check if previous chart instance exists and destroy it
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart instance and store it in the ref
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: temperatureData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [temperatureData]);

  return (
    <div className="chartContainer">
      <canvas id="temperatureChart"></canvas>
    </div>
  );
};

export default TemperatureChart;
