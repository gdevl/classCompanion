import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms, setUserClasses } from "../../../../src/store/users";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { red, blue } from "@material-ui/core/colors";
import UserCardContainer from "../UserCard/UserCardContainer";
import Button from "@material-ui/core/Button";
import "./DashboardHeader.css";
import AskQuestionContainer from "../ask-a-question/AskQuestionContainer";
import AnswerViewContainer from "../AnswerView/AnswerViewContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  blue: {
    color: blue[500],
  },
  red: {
    color: red[500],
  },
}));

export default function DashboardHeader({ props }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentUser = useSelector((state) => state.store.current_user);
  const currentState = useSelector((state) => state.store);
  const currentClass = currentState.classrooms[currentState.current_class.id];

  const [open, setOpen] = React.useState(false);
  const [openAnswer, setOpenAnswer] = React.useState(false);

  const handleQuestion = () => {
    setOpen(true);
  };
  const handleAnswer = () => {
    setOpenAnswer(true);
  };

  const checkedIn = (id) => {
    let checkedIn = false;
    let today = new Date();
    currentClass.check_ins.forEach((checkIn) => {
      let checkInDay = new Date(checkIn.created_on);
      if (
        checkIn.student_id === id &&
        today.getFullYear() == checkInDay.getFullYear() &&
        today.getMonth() == checkInDay.getMonth() &&
        today.getDate() == checkInDay.getDate()
      ) {
        checkedIn = true;
      }
    });
    return checkedIn;
  };

  const pendingQuestion = (id) => {
    let pending = false;
    currentClass.questions.forEach((question) => {
      if (question.student_id === id && question.resolved === false) {
        pending = true;
      }
    });
    return pending;
  };

  const pendingAnswer = (id) => {
    let pending = false;
    currentClass.questions.forEach((question) => {
      if (question.student_id === id && question.resolved === true) {
        if (question.answers.length >= 1) {
          if (question.answers[0].active === true)
            pending = {
              id: question.answers[0].id,
              question: question.content,
              answer: question.answers[0].content,
            };
        }
      }
    });
    return pending;
  };

  const handleCheckin = async () => {
    const checkIn = await fetch(
      `/api/classes/${currentClass.id}/user/${currentUser.id}/checkin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (checkIn.ok) {
      const classrooms = await fetchClassrooms(currentUser.id);
      dispatch(setUserClasses(classrooms));
    }
  };

  return (
    <>
      <Grid item className="instructorCard">
        <UserCardContainer
          props={{ ...props.instructors[0], checked_in: true }}
        />
      </Grid>

      <Grid item className="instructorMessage">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Daily Message"
            value={props.daily_objective}
            disabled={true}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Course Description"
            multiline
            rowsMax={4}
            value={props.description}
            disabled={true}
          />
        </form>
      </Grid>

      <Grid item className="meetingInfo">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Meeting Link"
            value={props.meeting_link}
            disabled={true}
          />
          <TextField
            id="standard-name"
            label="Meeting Password"
            value={props.meeting_pw}
            disabled={true}
          />
        </form>
      </Grid>

      <Grid item className="checkinAndQuestionButton">
        {/* <Grid className="buttonContainer"> */}
        {checkedIn(currentUser.id) ? (
          pendingQuestion(currentUser.id) ? (
            <Button color="secondary" disabled="true">
              Question Pending
            </Button>
          ) : pendingAnswer(currentUser.id) ? (
            <Button color="primary" onClick={handleAnswer}>
              View Answer
            </Button>
          ) : (
            <Button color="primary" onClick={handleQuestion}>
              Ask A Question
            </Button>
          )
        ) : (
          <Button color="secondary" onClick={handleCheckin}>
            Check In
          </Button>
        )}
        {/* </Grid> */}
      </Grid>
      <AskQuestionContainer props={{ open, setOpen }} />
      <AnswerViewContainer
        props={{
          answer: pendingAnswer(currentUser.id),
          open: openAnswer,
          setOpen: setOpenAnswer,
        }}
      />
    </>
  );
}
