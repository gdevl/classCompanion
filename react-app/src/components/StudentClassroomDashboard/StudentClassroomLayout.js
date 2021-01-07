import React from "react";
import ClassroomLayoutContainer from "./ClassroomLayout/ClassroomLayoutContainer";
import { useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import DashboardHeaderContainer from "./DashboardHeader/DashboardHeaderContainer";
import "./StudentLayout.css";

export default function StudentClassroomLayout({ socket }) {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassrom = useSelector((state) => state.store.current_class);

  if (!classList) return null;
  return (
    <>
      <DashboardHeaderContainer
        props={classList[currentClassrom.id]}
        socket={socket}
      />
      <Divider className="content__divider" />
      <Typography align="center" variant="h5" gutterBottom>
        Class List
      </Typography>
      <ClassroomLayoutContainer props={classList[currentClassrom.id]} />
    </>
  );
}
