import React from "react";
import "./PopUp.css"; // Style for the popup
import { Line } from "react-chartjs-2";

function PopUp({ chartData, onClose }) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close_btn" onClick={onClose}>Close</button>
        <div className="chart_container">
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                line: {
                  fill: true // Fill the area under the line
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default PopUp;
