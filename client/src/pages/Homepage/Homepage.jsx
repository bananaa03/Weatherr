import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Grid from "@mui/material/Grid";
import General from '../../components/General/General'
import Detail from '../../components/Detail/Detail'
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem("token");
    if (!token) {
      // Nếu không có token, chuyển hướng người dùng đến trang đăng nhập
      navigate('/login');
    } else {
      // Nếu có token, đánh dấu người dùng đã đăng nhập
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div id="main">
      {!isLoggedIn && <h1>Please log in to access this page.</h1>}
      {isLoggedIn && 
      <Grid container spacing={0}>
        <Grid item xs={4.5}>
          <General />
        </Grid>
        <Grid item xs={7.5}>
          <Detail />
        </Grid>
      </Grid>
      }
    </div>
  );
}

export default Homepage;
