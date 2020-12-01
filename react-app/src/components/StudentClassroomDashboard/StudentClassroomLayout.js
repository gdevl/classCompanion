import React from "react";
import ClassroomLayoutContainer from "./ClassroomLayout/ClassroomLayoutContainer";
import { useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import DashboardHeadder from "./DashboardHeader/DashboardHeaderContainer";
import "./StudentLayout.css";

export default function StudentClassroomLayout() {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassrom = useSelector((state) => state.store.current_class);

  if (!classList) return null;
  return (
    <>
      <DashboardHeadder props={classList[currentClassrom.id]} />
      <Divider className="content__divider" />
      <Typography align="center" variant="h5" gutterBottom>
        Class List
      </Typography>
      <ClassroomLayoutContainer props={classList[currentClassrom.id]} />
    </>
  );
}
