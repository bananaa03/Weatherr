import React from "react";
import "./General.css";

function General() {
  return (
    <div id="general">
      <img
        className="sunny"
        src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
        alt="sunny"
      />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <h1 className="temp">31</h1>
        <h2 className="celcius">°C</h2>
      </div>
      <h3 className="status">Sunny</h3>
      <div className="line"></div>
      <p className="dmy">Friday, 21-July-2023</p>
      <p className="hours">12:44 PM</p>
    </div>
  );
}

export default General;
