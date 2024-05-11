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
  const [activeTab, setActiveTab] = useState("hourly"); // Thêm state cho active tab

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
        data: [29, 28, 28, 29, 29],
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
        data: [87, 87, 87, 84, 85],
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
        data: [40, 20, 10, 20, 20],
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "#3eabe4",
        fill: false,
      },
    ],
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div id="detail">
      {/* Tab buttons */}
      <div className="tabButtons">
        <button
          className={activeTab === "current" ? "activeTabButton" : "tabButton"}
          onClick={() => handleTabChange("current")}
          style={{ border: "none", fontSize: 25, fontWeight: 600, marginRight: 50, marginLeft: 50, marginTop: 30, marginBottom: 30, cursor: "pointer", borderBottom: activeTab === "current" ? "2px solid #000" : "none" }}
        >
          Current Weather
        </button>

        <button
          className={activeTab === "hourly" ? "activeTabButton" : "tabButton"}
          onClick={() => handleTabChange("hourly")}
          style={{ border: "none", fontSize: 25, fontWeight: 600, marginRight: 50, cursor: "pointer", borderBottom: activeTab === "hourly" ? "2px solid #000" : "none" }}
        >
          Hourly Forecast
        </button>
      </div>

      {/* Content */}
      {activeTab === "hourly" && (
        <div>
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
        </div>
      )}

      {activeTab === "current" && (
        <div>
          <Grid container spacing={4} className="grid">
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Temperature</div>
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>33°C</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Humidity</div>
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>68%</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Rain</div>
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>52%</div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      <a href="./login">
        <button className="signout">Sign Out</button>
      </a>
      {showPopup && <PopUp chartData={selectedChart} onClose={closePopup} />}
    </div>
  );
}

export default Detail;
