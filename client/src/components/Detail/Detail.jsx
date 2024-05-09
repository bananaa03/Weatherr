import React, { useState } from "react";
import "./Detail.css";
import Grid from "@mui/material/Grid";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import HumidityChart from "../HumidityChart/HumidityChart";
import RainChart from "../RainChart/RainChart";
import PopUp from "../PopUp/PopUp";

function Detail() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  // Define functions to handle popup
  const openPopup = (chart) => {
    setSelectedChart(chart);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const temperatureData = {
    labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "Temperature",
          data: [29, 28, 28, 29, 29], // Dữ liệu nhiệt độ (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4",
          fill: false,
        },
      ],
  };

  const humidityData = {
    labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "Humidity",
          data: [87, 87, 87, 84, 85], // Dữ liệu độ ẩm (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4",
          fill: false,
        },
      ],
  };

  const rainData = {
    labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "Rain",
          data: [40, 20, 10, 20, 20], // Dữ liệu lượng mưa (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4",
          fill: false,
        },
      ],
  };

  return (
    <div id="detail">

      {/* Hourly */}
      <h1 className="hourly">Hourly</h1>
      <Grid container spacing={4} className="grid">
        <Grid item xs={3.5} onClick={() => openPopup(temperatureData)}>
          <div className="gridItem">
            <div>Temperature</div>
            <TemperatureChart data={temperatureData} />
          </div>
        </Grid>
        <Grid item xs={3.5} onClick={() => openPopup(humidityData)}>
          <div className="gridItem">
            <div>Humidity</div>
            <HumidityChart data={humidityData} />
          </div>
        </Grid>
        <Grid item xs={3.5} onClick={() => openPopup(rainData)}>
          <div className="gridItem">
            <div>Rain</div>
            <RainChart data={rainData} />
          </div>
        </Grid>
      </Grid>
      <a href="./login">
        <button className="signout">Sign Out</button>
      </a>
      {showPopup && (
        <PopUp chartData={selectedChart} onClose={closePopup} />
      )}
    </div>
  );
}

export default Detail;
