import React from "react";
import Typography from "@material-ui/core/Typography";

const heroHeader = "Howdy! Welcome to the Class Corral!";
const heroSubHeader = "Sign in below to start wranglin'!";

const Hero = () => {
  return (
    <>
      <Typography align="center" variant="h2" component="h3" gutterBottom>
        {heroHeader}
      </Typography>
      <Typography align="center" variant="h3" component="h4" gutterBottom>
        {heroSubHeader}
      </Typography>
    </>
  );
};

export default Hero;
