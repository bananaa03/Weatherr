import React, { useEffect, useState } from "react";
import "./Detail.css";
import Grid from "@mui/material/Grid";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import HumidityChart from "../HumidityChart/HumidityChart";
import RainChart from "../RainChart/RainChart";
import PopUp from "../PopUp/PopUp";
import moment from 'moment';

function Detail() {

  const [data, setData] = useState([]);
  const [temps, setTemps] = useState([]);
  const [humids, setHumids] = useState([]);
  const [rains, setRains] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [activeTab, setActiveTab] = useState("current"); // Thêm state cho active tab


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/datadays/");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const tempsArray = [];
      const rainsArray = [];
      const humidsArray = [];
      const timestampsArray = [];

      data.forEach((item) => {
        const key = Object.keys(item.data)[0];
        const record = item.data[key];

        tempsArray.push(record.temp);
        rainsArray.push(record.rain);
        humidsArray.push(record.humid);
        let timestamp_data=record.timestamp;
        let dayOfMonth=moment.utc(timestamp_data).format("DD");
        let month=moment.utc(timestamp_data).format("MM");
        timestampsArray.push(`${dayOfMonth} tháng ${month}`);
      });

      setTemps(tempsArray);
      setRains(rainsArray);
      setHumids(humidsArray);
      setTimestamps(timestampsArray);
    }
  }, [data]);

  
  const fetchPrediction = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are 0-based
    const day = currentDate.getDate();

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, month, day }),
      });
      const predictionData = await response.json();
      setPrediction(predictionData);
    } catch {
      console.log("Error fetching prediction data");
    }
  };

  fetchPrediction();

  // Define functions to handle popup
  const openPopup = (chart) => {
    setSelectedChart(chart);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const temperatureData = {
    labels: [timestamps[0], timestamps[1], timestamps[2], timestamps[3], timestamps[4]],
    datasets: [
      {
        label: "Temperature",
        data: [temps[0], temps[1], temps[2], temps[3], temps[4]],
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "#3eabe4",
        fill: false,
      },
    ],
  };

  const humidityData = {
    labels: [timestamps[0], timestamps[1], timestamps[2], timestamps[3], timestamps[4]],
    datasets: [
      {
        label: "Humidity",
        data: [humids[0], humids[1], humids[2], humids[3], humids[4]],
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "#3eabe4",
        fill: false,
      },
    ],
  };

  const rainData = {
    labels: [timestamps[0], timestamps[1], timestamps[2], timestamps[3], timestamps[4]],
    datasets: [
      {
        label: "Rain",
        data: [rains[0], rains[1], rains[2], rains[3], rains[4]],
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
          Hôm nay
        </button>

        <button
          className={activeTab === "tomorrow" ? "activeTabButton" : "tabButton"}
          onClick={() => handleTabChange("tomorrow")}
          style={{ border: "none", fontSize: 25, fontWeight: 600, marginRight: 50, cursor: "pointer", borderBottom: activeTab === "tomorrow" ? "2px solid #000" : "none" }}
        >
          Ngày mai
        </button>

        <button
          className={activeTab === "history" ? "activeTabButton" : "tabButton"}
          onClick={() => handleTabChange("history")}
          style={{ border: "none", fontSize: 25, fontWeight: 600, marginRight: 50, cursor: "pointer", borderBottom: activeTab === "history" ? "2px solid #000" : "none" }}
        >
          Các ngày trước
        </button>
      </div>

      {/* Content */}
      {activeTab === "history" && (
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
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>{data[0].temp}°C</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Humidity</div>
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>{data[0].humid}%</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Rain</div>
                <div style={{ fontSize: 40, textAlign: "center", marginTop: 10 }}>{data[0].rain}</div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {activeTab === "tomorrow" && (
        <div>
          <Grid container spacing={4} className="grid">
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Temperature</div>
                <div style={{ fontSize: 30, textAlign: "center", marginTop: 10 }}>{prediction.min}°C - {prediction.max}°C</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Humidity</div>
                <div style={{ fontSize: 30, textAlign: "center", marginTop: 10 }}>{prediction.humidi}%</div>
              </div>
            </Grid>
            <Grid item xs={3.5}>
              <div className="gridItem">
                <div>Rain</div>
                <div style={{ fontSize: 30, textAlign: "center", marginTop: 10 }}>{prediction.rain}</div>
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
