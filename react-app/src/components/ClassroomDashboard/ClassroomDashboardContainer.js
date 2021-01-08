import React from "react";
import Typography from "@material-ui/core/Typography";
import ClassroomLayoutContainer from "./ClassroomLayout/ClassroomLayoutContainer";
import { useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import DashboardHeader from "./DashboardHeader/DashboardHeaderContainer";

export default function ClassroomDashboardContainer() {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassroom = useSelector((state) => state.store.current_class);

  if (!classList) return null;
  return (
    <>
      <DashboardHeader props={classList[currentClassroom.id]} />
      <Divider className="content__divider" />
      <Typography align="center" variant="h5" gutterBottom>
        Class List
      </Typography>
      <ClassroomLayoutContainer props={classList[currentClassroom.id]} />
    </>
  );
};
