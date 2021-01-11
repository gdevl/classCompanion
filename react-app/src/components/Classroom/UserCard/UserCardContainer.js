import React from "react";
import Grid from "@material-ui/core/Grid";
import UserCard from "./UserCard";

export default function UserCardContainer({ props }) {
  return (
    <Grid item>
      <UserCard props={props} />
    </Grid>
  );
}
