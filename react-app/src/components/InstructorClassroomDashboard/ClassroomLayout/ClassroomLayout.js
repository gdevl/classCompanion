import React from "react";
import UserCardContainer from "../UserCard/UserCardContainer";
import GroupCardContainer from "../GroupCard/GroupCardContainer";

export default function ClassroomLayout({ props }) {
  console.log(props.students);
  if (!props) return null;

  if (props.students.length === 0) {
    console.log("no students");
    return (
      <>
        <div className="enroll-students-instructions-container">
          <div>
            <h3 className="enroll-students-instructions-heading">
              You Have not yet Enrolled any Students
            </h3>
          </div>
          <br></br>
          <div>
            <h3>
              You Can Enroll Students by Clicking "My Classes" Followed by
              "Enroll Students" on the Desired Class Card
            </h3>
          </div>
        </div>
      </>
    );
  }

  //if no groups are set to false, then render everyone individually
  if (!props.groups.length >= 1) {
    return (
      <>
        {props.students.map((user) => {
          return <UserCardContainer key={user.id} props={user} />;
        })}
      </>
    );
  }

  //if groups are set to true render group containers based on the size of the groups
  if (props.groups.length >= 1) {
    let groups = [];
    for (let i = 0; i < props.groups.length; i++) {
      groups.push(`Group ${i + 1}`);
    }

    return (
      <>
        <GroupCardContainer props={{ groups, members: props.groups }} />
      </>
    );
  }
}
