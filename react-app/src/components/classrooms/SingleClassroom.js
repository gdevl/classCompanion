import React from "react";
import { useSelector } from "react-redux";
import UserCardContainer from "../UserCard/UserCardContainer";
import GroupCardContainer from "../GroupCard/GroupCardContainer";

const SingleClassroom = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const currentClassroom = useSelector(
    (state) => state.classrooms[state.currentClassroom]
  );

  if (!currentUser) return null;
  if (!currentClassroom) return null;

  return (
    <>
      <div className="classroom__details">
        <h1>{currentClassroom.name}</h1>
      </div>
      <p>{console.log(currentClassroom)}</p>
    </>
  );
};

export default SingleClassroom;
