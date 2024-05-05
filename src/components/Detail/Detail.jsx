import React from "react";
import "./Detail.css";
import Grid from "@mui/material/Grid";

function Detail() {
  return (
    <div id="detail">
      <h1 className="today">Today</h1>
      <Grid container spacing={4} className="grid">
        <Grid item xs={3.5}>
          <div className="gridItem">
            <div>Temperature</div>

          </div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Humidity</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">Rain</div>
        </Grid>
        <Grid item xs={3.5}>
          <div className="gridItem">UV Index</div>
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
    </div>
  );
}

export default Detail;
