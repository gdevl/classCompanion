import React from "react";
import ClassroomLayoutContainer from "./ClassroomLayout/ClassroomLayoutContainer";
import { useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import DashboardHeadder from "./DashboardHeader/DashboardHeaderContainer";

export default function InstructorClassroomLayout() {
  const classList = useSelector((state) => state.store.classrooms);
  const currentClassrom = useSelector((state) => state.store.current_class);

  if (!classList) return null;
  return (
    <>
      <DashboardHeadder props={classList[currentClassrom.id]} />
      <Divider className="content__divider" />
      <ClassroomLayoutContainer props={classList[currentClassrom.id]} />
    </>
  );
}
