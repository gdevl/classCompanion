import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ClassroomLayout from "./ClassroomLayout";
import "./ClassroomLayout.css";

export default function ClassroomLayoutContainer({ props }) {
  return (
    <Grid container justify="center" spacing={3}>
      <ClassroomLayout props={props} />
    </Grid>
  );
}
