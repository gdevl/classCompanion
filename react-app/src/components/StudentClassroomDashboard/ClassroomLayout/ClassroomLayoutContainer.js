import React from "react";
import Grid from "@material-ui/core/Grid";
import ClassroomLayout from "./ClassroomLayout";
import "./ClassroomLayout.css";

export default function ClassroomLayoutContainer({ props, socket }) {
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      alignItems="center"
      spacing={3}
    >
      <ClassroomLayout props={props} socket={socket} />
    </Grid>
  );
}
