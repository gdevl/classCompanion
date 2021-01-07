import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Typography,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import { fetchClassrooms, setUserClasses } from "../../../../src/store/users";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "fontsource-roboto";
import SocketContext from '../../../socketContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    outline: "0",
    border: "2px solid white",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  editHeading: {
    marginBottom: "1rem",
  },
  element: {
    padding: "1rem",
  },
  button: {
    marginTop: "2rem",
  },
  btnContainer: {
    position: "relative",
    left: "72%",
    bottom: "100%",
  },
  exitBtn: {
    position: "relative",
    bottom: "1.95rem",
    left: "10rem",
    border: "none",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
  avatar: {
    marginBottom: "1rem",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AskQuestion = ({ props }) => {
  // const socket = io.connect("http://localhost:5000");
  const dispatch = useDispatch();
  const socket = useContext(SocketContext)
  // const currentUser = useSelector((state) => state.store.current_user)
  // const idd = currentUser.id
  const classes = useStyles();
  const [question, setQuestion] = useState("");

  // access current_user id object from redux store
  // ---------------------------------------
  // const id = localStorage.getItem('USERID')
  // ---------------------------------------
  //check form submission for updateProfile call

  const currentUser = useSelector((state) => state.store);
  const currentState = useSelector((state) => state.store);
  // console.log(currentUser.current_user.id)

  if (!currentUser.current_user) return null;
  const user_id = currentUser.current_user.id;

  if (!currentState.current_class) return null;
  const currentClass = currentState.classrooms[currentState.current_class.id];
  const class_id = currentClass.id;

  const postQuestion = async () => {
    const response = await fetch(
      `/api/classes/${class_id}/user/${user_id}/question`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      }
    );
    if (response.ok) {
      //   console.log("response.content:");
      console.log("question:");
      console.log(question);
      socket.emit("question", {
        question: question,
        classroom: currentState.current_class.id
      });
      const classrooms = await fetchClassrooms(currentUser.current_user.id);
      dispatch(setUserClasses(classrooms));
    }
    handleClose();
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const updateQuestion = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="question__container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Typography variant="h5">
            <form
              className={classes.paper}
              noValidate
              autoComplete="off"
              onSubmit={postQuestion}
            >
              {/* <form className={classes.paper} noValidate autoComplete='off'> */}
              <Button
                size="large"
                variant="contained"
                onClick={handleClose}
                className={classes.exitBtn}
                variant="outlined"
              >
                x
              </Button>
              <Typography variant="h4" className={classes.editHeading}>
                Ask a Question
              </Typography>
              <TextField
                autoFocus
                id="filled-multiline-static"
                // label="Multiline"
                multiline
                rows={4}
                // defaultValue="Default Value"
                // variant="filled"
                onChange={updateQuestion}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={postQuestion}
              >
                Submit
              </Button>
            </form>
          </Typography>
        </Fade>
      </Modal>
    </div>
  );
};

export default AskQuestion;
