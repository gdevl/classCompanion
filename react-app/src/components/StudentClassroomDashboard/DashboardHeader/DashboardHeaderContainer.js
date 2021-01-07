import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "./DashboardHeader";
import "./DashboardHeader.css";

export default function DashboardHeaderContainer({ props, socket }) {
  return (
    <Grid
      // className="outlined"
      container
      justify="space-evenly"
      alignItems="center"
      spacing={3}
    >
      <DashboardHeader props={props} socket={socket} />
    </Grid>
  );
}
