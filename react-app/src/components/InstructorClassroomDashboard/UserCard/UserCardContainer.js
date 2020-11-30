import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import UserCard from "./UserCard";

export default function UserCardContainer({ props }) {
  return (
    // <Grid item className="userCardContainer">
    //   <UserCard props={props} />
    // </Grid>
    <Grid item>
      <UserCard props={props} />
    </Grid>
  );
}
