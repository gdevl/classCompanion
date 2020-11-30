import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../services/auth";
import { setCurrentUser } from "../../../store/users";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import LoginFormHeader from "./LoginFormHeader";

const useStyles = makeStyles((theme) => ({
  loginform: {
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

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needsSignUp, setNeedsSignUp] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setCurrentUser(user));
    } else {
      setErrors(user.errors);
    }
    // console.log("user: ", user);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setNeedsSignUp(true);
  };

  if (needsSignUp) {
    return <Redirect to="/signup" />;
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box>
        <LoginFormHeader />
      </Box>
      <form className={classes.loginform} onSubmit={onLogin}>
        <Box>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </Box>
        <Box>
          <TextField
            className={classes.inputs}
            name="email"
            type="text"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<VerifiedUserIcon />}
          >
            Log In
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<SupervisedUserCircleIcon />}
            onClick={handleSignUp}
          >
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
