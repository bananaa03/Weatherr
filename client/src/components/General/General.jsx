import React, { useState, useEffect } from "react";
import "./General.css";

function General() {
  const [isRaining, setIsRaining] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // Hàm để kiểm tra cảm biến mưa và cập nhật trạng thái
  const checkRainSensor = () => {
    // Logic để kiểm tra cảm biến mưa ở đây
    if (data){
      if (data.rain>=700) {
        setIsRaining(true);
        return (<div>Không mưa</div>);
      }
      else if (data.rain>=300) 
      {
        setIsRaining(false);
        return (<div>Mưa nhẹ</div>);
      }
      else {
        setIsRaining(false);
        return (<div>Mưa to</div>);
      }
    }
    
  };

  // Gọi hàm kiểm tra cảm biến mưa khi component được render
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await fetch('http://127.0.0.1:8000/firebase/');
        const jsonData= await response.json();
        setData(jsonData);
        setLoading(false);
      }
      catch{
        console.log("Error");
        setLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  },[]);
  const formatDate = (date) => {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const day = days[date.getDay()];
    const dayNumber = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}, ${dayNumber}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  if (loading) return <div>Loading...</div>
  return (
    <div id="general">
      <img
        className="weather-icon"
        src={isRaining ? "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-256.png" : "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"}
        alt={isRaining ? "rainy" : "sunny"}
      />
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <h1 className="temp">{data.temp}</h1>
        <h2 className="celcius">°C</h2>
      </div>
      {/* {checkRainSensor} */}
      <h3 className="status">{isRaining}</h3>
      <div className="line"></div>
      <p className="dmy">{formatDate(currentDateTime)}</p>
      <p className="hours">{formatTime(currentDateTime)}</p>
    </div>
  );
}

export default General;
