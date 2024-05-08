import React, { useState } from "react";
import "./Detail.css";
import Grid from "@mui/material/Grid";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import HumidityChart from "../HumidityChart/HumidityChart";
import RainChart from "../RainChart/RainChart";
import UVChart from "../UVChart/UVChart";
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

  const uvData = {
    labels: ["23h", "00h", "1h", "2h", "3h"],
      datasets: [
        {
          label: "UV Index",
          data: [20, 22, 21, 23, 25], // Dữ liệu tia UV (ví dụ)
          borderColor: "rgba(255, 255, 255, 1)",
          backgroundColor: "#3eabe4",
          fill: false,
        },
      ],
  };

  return (
    <div id="detail">
      <h1 className="today">Today</h1>
      <Grid container spacing={4} className="grid">
        <Grid item xs={3.5}>
          <div className="gridItem">
            <div>Temperature</div>
            <TemperatureChart data={temperatureData} />
            <button onClick={() => openPopup(temperatureData)}>View Chart</button>
          </div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">
            <div>Humidity</div>
            <HumidityChart data={humidityData} />
            <button onClick={() => openPopup(humidityData)}>View Chart</button>
          </div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">
            <div>Rain</div>
            <RainChart data={rainData} />
            <button onClick={() => openPopup(rainData)}>View Chart</button>
          </div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">
            <div>UV index</div>
            <UVChart data={uvData} />
            <button onClick={() => openPopup(uvData)}>View Chart</button>
          </div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Something</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Something</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Something</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Something</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Something</div>
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
