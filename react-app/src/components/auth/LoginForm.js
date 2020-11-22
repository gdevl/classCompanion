import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  loginform: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
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
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <TextField
          name="email"
          type="text"
          value={email}
          onChange={updateEmail}
          id="filled-basic"
          label="Email"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          name="password"
          type="password"
          value={password}
          onChange={updatePassword}
          id="filled-basic"
          label="Password"
          variant="filled"
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
