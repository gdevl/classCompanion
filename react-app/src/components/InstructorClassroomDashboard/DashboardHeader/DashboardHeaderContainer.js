import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "./DashboardHeader";
import "./DashboardHeader.css";

export default function DashboardHeaderContainer({ props }) {
  return (
    <Grid
      container
      item
      justify="space-evenly"
      alignItems="center"
      spacing={3}
      // className="outlined"
    >
      <DashboardHeader props={props} />
    </Grid>
  );
}
