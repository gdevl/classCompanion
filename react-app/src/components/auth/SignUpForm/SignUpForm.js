import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../services/auth";
import SignUpFormHeader from "./SignUpFormHeader";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

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
  const [signedUp, setSignedUp] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(
        username,
        first_name,
        last_name,
        email,
        password
      );
      if (!user.errors) {
        setAuthenticated(true);
        setSignedUp(true);
      } else {
        setErrors(user.errors);
      }
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

  if (authenticated) {
    return <Redirect to="/" />;
  }

  if (signedUp) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box>
        <SignUpFormHeader />
      </Box>
      <form className={classes.signupform} onSubmit={onSignUp}>
        <Box>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </Box>
        {/* <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div> */}
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
        {/* <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={first_name}
          ></input>
        </div> */}
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
        {/* <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={last_name}
          ></input>
        </div> */}
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
        {/* <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div> */}
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
        {/* <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div> */}
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
        {/* <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div> */}
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
        {/* <button type="submit">Sign Up</button> */}
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
      </form>
    </>
  );
};

export default SignUpForm;
