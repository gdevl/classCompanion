import React from "react";
import Typography from "@material-ui/core/Typography";

const formHeader = "We'll need some info from you to get started.";
const formSubHeader = "Usernames are optional— all other fields are required.";

const SignUpFormHeader = () => {
  return (
    <>
      <Typography align="center" variant="h4" component="h4" gutterBottom>
        {formHeader}
      </Typography>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        {formSubHeader}
      </Typography>
    </>
  );
};

export default SignUpFormHeader;
