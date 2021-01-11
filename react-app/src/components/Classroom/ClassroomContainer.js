//Framework
import React from "react";
import { useSelector } from "react-redux";
//MUI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid"
//Components
import Dashboard from './Dashboard/Dashboard'
import ClassLayout from "./ClassLayout/ClassLayout";

//Classroom Container
export default function ClassroomContainer() {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassroom = useSelector((state) => state.store.current_class);
  const currentUser = useSelector((state) => state.store.current_user);

  if (!classList) return null;
  return (
    <>
      <Grid container justify="space-evenly" alignItems="center" spacing={3}>
        <Dashboard props={classList[currentClassroom.id]} />
      </Grid>
      <Divider className="content__divider" />
      <Typography align="center" variant="h5" gutterBottom>
        Class List
      </Typography>
      <Grid container justify="center" spacing={3}>
        <ClassLayout props={classList[currentClassroom.id]} />
      </Grid>
    </>
  );
};
