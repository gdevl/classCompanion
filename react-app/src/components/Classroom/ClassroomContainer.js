//Framework
import React from "react";
import { useSelector } from "react-redux";
//MUI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
//Components
import Dashboard from './Dashboard/Dashboard'
import ClassLayout from "./ClassLayout/ClassLayout";

//Classroom Container
export default function ClassroomContainer() {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassroom = useSelector((state) => state.store.current_class);

  if (!classList) return null;
  return (
    <>
      <Dashboard props={classList[currentClassroom.id]} />
      <Divider className="content__divider" />
      <Typography align="center" variant="h5" gutterBottom>
        Class List
      </Typography>
      <ClassLayout props={classList[currentClassroom.id]} />
    </>
  );
};
