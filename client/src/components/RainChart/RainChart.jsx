import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const RainChart = () => {
  const [rainData, setRainData] = useState(null);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Truy vấn API hoặc dịch vụ dự báo thời tiết ở đây
    // Đoạn mã này chỉ là một ví dụ giả định

    // Mock data
    const mockData = {
      labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "Rain",
          data: [40, 30, 14, 20, 24], // Dữ liệu lượng mưa (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4"
        },
      ],
    };

    setRainData(mockData); // Cập nhật state với dữ liệu giả định
  }, []);

  useEffect(() => {
    // Vẽ biểu đồ khi rainData có dữ liệu
    if (rainData) {
      const ctx = document.getElementById("rainChart").getContext("2d");

      // Check if previous chart instance exists and destroy it
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart instance and store it in the ref
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: rainData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [rainData]);

  return (
    <div className="chartContainer">
      <canvas id="rainChart"></canvas>
    </div>
  );
};

export default RainChart;
