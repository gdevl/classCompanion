import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UserCardContainer from "../UserCard/UserCardContainer";
import "./GroupCard.css";

export default function GroupCard({ props }) {
  if (!props) return null;

  return (
    <>
      <Box className="groupTitleContainer">
        <Typography variant="h4" align="center">
          {props.group}
        </Typography>
      </Box>
      <Divider />
      <Box className="groupMembers">
        {props.members.members.map((member) => {
          return (
            <UserCardContainer key={`userCard${member.id}`} props={member} />
          );
        })}
      </Box>
    </>
  );
}
