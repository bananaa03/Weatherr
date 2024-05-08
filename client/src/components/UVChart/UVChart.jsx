import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const UVChart = () => {
  const [uvData, setUVData] = useState(null);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Truy vấn API hoặc dịch vụ dự báo thời tiết ở đây
    // Đoạn mã này chỉ là một ví dụ giả định

    // Mock data
    const mockData = {
      labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "UV Index",
          data: [10, 10, 10, 10, 10], // Dữ liệu tia UV (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4"
        },
      ],
    };

    setUVData(mockData); // Cập nhật state với dữ liệu giả định
  }, []);

  useEffect(() => {
    // Vẽ biểu đồ khi humidityData có dữ liệu
    if (uvData) {
      const ctx = document.getElementById("uvChart").getContext("2d");

      // Check if previous chart instance exists and destroy it
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart instance and store it in the ref
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: uvData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [uvData]);

  return (
    <div className="chartContainer">
      <canvas id="uvChart"></canvas>
    </div>
  );
};

export default UVChart;
