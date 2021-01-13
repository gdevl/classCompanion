import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../services/auth";
import SignUpFormHeader from "./SignUpFormHeader";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  signupform: {
    "& > *": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  inputs: {
    width: "100%",
  },
}));

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();

      const user = await signUp(
        username,
        first_name,
        last_name,
        email,
        password,
        repeatPassword,
        role
      );
      if (!user.errors) {
        setAuthenticated(true);
        setSignedUp(true);
      } else {
        console.log(user.errors)
        setErrors(user.errors);
      }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateRole = (e) => {
    setRole(e.target.value);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  if (signedUp) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup__wrapper">
      <Box>
        <SignUpFormHeader />
      </Box>
      <form className={classes.signupform} onSubmit={onSignUp}>
        <Box>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="username"
            type="text"
            value={username}
            onChange={updateUsername}
            id="username"
            label="Username"
            variant="filled"
          />
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="first_name"
            type="text"
            value={first_name}
            onChange={updateFirstName}
            id="first_name"
            label="First Name"
            variant="filled"
          />
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="last_name"
            type="text"
            value={last_name}
            onChange={updateLastName}
            id="last_name"
            label="Last Name"
            variant="filled"
          />
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="email"
            type="email"
            value={email}
            onChange={updateEmail}
            id="email"
            label="Email"
            variant="filled"
          />
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
            id="password"
            label="Password"
            variant="filled"
          />
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="repeat_password"
            type="password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
            label="Confirm Password"
            variant="filled"
          />
        </Box>
        <Box>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="role-select">Your Role</InputLabel>
            <Select
              labelId="role-select"
              id="user_role"
              value={role}
              onChange={(e) => updateRole(e)}
            >
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"instructor"}>Instructor</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            className={classes.button}
            startIcon={<SupervisedUserCircleIcon />}
          >
            Submit
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUpForm;
