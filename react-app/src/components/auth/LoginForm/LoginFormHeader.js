import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const formHeader = "Class Companion";
const formSubHeader = "Sign In Below";
// const formSubHeader = "Don't have an account?";

const LoginFormHeader = () => {
  return (
    <>
      <Typography align="center" variant="h3" component="h3" gutterBottom>
        {formHeader}
      </Typography>
      <Typography align="center" variant="h4" component="h4" gutterBottom>
        {formSubHeader}
      </Typography>
    </>
  );
};

export default LoginFormHeader;
