import React from "react";
import "./Homepage.css";
import Grid from "@mui/material/Grid";
import General from '../../components/General/General'
import Detail from '../../components/Detail/Detail'

function Homepage() {
  return (
    <div id="main">
      <Grid container spacing={0}>
        <Grid item xs={4.5}>
          <General />
        </Grid>
        <Grid item xs={7.5}>
          <Detail />
        </Grid>
      </Grid>
    </div>
  );
}

export default Homepage;
