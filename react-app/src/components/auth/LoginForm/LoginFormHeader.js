import React from "react";
import Typography from "@material-ui/core/Typography";

const formHeader = "Howdy! Welcome to the Class Corral!";
const formSubHeader = "Sign in below to start wranglin'!";

const LoginFormHeader = () => {
  return (
    <>
      <Typography align="center" variant="h2" component="h3" gutterBottom>
        {formHeader}
      </Typography>
      <Typography align="center" variant="h3" component="h4" gutterBottom>
        {formSubHeader}
      </Typography>
    </>
  );
};

export default LoginFormHeader;
