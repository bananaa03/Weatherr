import React, { useState, useEffect } from "react";
import "./General.css";

function General() {
  const [isRaining, setIsRaining] = useState(false);

  // Hàm để kiểm tra cảm biến mưa và cập nhật trạng thái
  const checkRainSensor = () => {
    // Logic để kiểm tra cảm biến mưa ở đây
    setIsRaining(false);
  };

  // Gọi hàm kiểm tra cảm biến mưa khi component được render
  useEffect(() => {
    checkRainSensor();
  }, []);

  return (
    <div id="general">
      <img
        className="weather-icon"
        src={isRaining ? "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-256.png" : "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"}
        alt={isRaining ? "rainy" : "sunny"}
      />
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <h1 className="temp">31</h1>
        <h2 className="celcius">°C</h2>
      </div>
      <h3 className="status">{isRaining ? "Rainy" : "Sunny"}</h3>
      <div className="line"></div>
      <p className="dmy">Friday, 21-July-2023</p>
      <p className="hours">12:44 PM</p>
    </div>
  );
}

export default General;
