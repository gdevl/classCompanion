import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../../services/auth";
import { setCurrentUser } from "../../../store/users";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SchoolIcon from "@material-ui/icons/School";
import LoginFormHeader from "./LoginFormHeader";

const accountCreationText = "Create an account to get started.";
const demoStudentLoginEmail = "jwinger@greendale.edu";
const demoInstructorLoginEmail = "bchang@greendale.edu";

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
  instructor: {
    backgroundColor: "purple",
  },
  login: {
    backgroundColor: "#ad40b5",
    // backgroundColor: "#7340b5",
    "&:hover": {
      backgroundColor: "#7340b5",
      //   backgroundColor: "#ad40b5",
    },
  },
}));

const LoginForm = ({ authenticated, setAuthenticated }) => {
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
      // dispatch(setCurrentUser(user));
    } else {
      console.log(user.errors);
      setErrors(user.errors);
    }
    // console.log("user: ", user);
  };

  const handleStudentDemo = async (e) => {
    e.preventDefault();
    const user = await login(demoStudentLoginEmail, "password");
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      console.log(user.errors);
      setErrors(user.errors);
    }
  };

  const handleInstructorDemo = async (e) => {
    e.preventDefault();
    const user = await login(demoInstructorLoginEmail, "password");
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      console.log(user.errors);
      setErrors(user.errors);
    }
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
      <div className="login__container">
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
              color="secondary"
              size="large"
              className={classes.login}
              startIcon={<VerifiedUserIcon />}
            >
              Sign In
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              //   className={classes.student}
              startIcon={<SchoolIcon />}
              onClick={handleStudentDemo}
            >
              DEMO LOGIN (student)
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              //   className={classes.instructor}
              startIcon={<SupervisedUserCircleIcon />}
              onClick={handleInstructorDemo}
            >
              DEMO LOGIN (instructor)
            </Button>
          </Box>
        </form>
        <div className="account__creation_row">
          <Typography component="p">New here?</Typography>
          <Typography component="p">
            <Link className="account__creation_link" to="/signup">
              {accountCreationText}
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
