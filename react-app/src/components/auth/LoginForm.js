import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Hero from "../Hero";

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
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box>
        <Hero />
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
            id="filled-basic"
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
            id="filled-basic"
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
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
