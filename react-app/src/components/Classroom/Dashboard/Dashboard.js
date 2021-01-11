//REACT/REDUX
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms, setUserClasses } from "../../../../src/store/users";
//MUI
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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
import Button from "@material-ui/core/Button"
import { red, blue } from "@material-ui/core/colors";
//COMPONENTS
import UserCardContainer from "../UserCard/UserCardContainer";

//MUI Styling
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

//DASHBOARD COMPONENT
export default function Dashboard({ props }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentUser = useSelector((state) => state.store.current_user);

  const [editMode, setEditMode] = React.useState(false);
  const [grouped, setGrouped] = React.useState(props.groups.length >= 1 ? true : false);
  const [groupSize, setGroupSize] = React.useState(props.groups[0] ? props.groups[0].members.length : 0);
  const [message, setMessage] = React.useState(props.daily_objective);
  const [description, setDescription] = React.useState(props.description);
  const [link, setLink] = React.useState(props.meeting_link);
  const [password, setPassword] = React.useState(props.meeting_pw);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleGroupedChange = (event) => {
    if (event.target.value === false) setGroupSize(0);
    if (event.target.value !== false) setGroupSize(2);
    setGrouped(event.target.value);
  };
  const handleGroupSizeChange = (event) => {
    setGroupSize(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEditMode = async () => {
    if (!editMode) setEditMode(true);
    else { handleInfoSubmit(); setEditMode(false); };
  };
  const handleInfoSubmit = async () => {
    const infoResponse = await fetch(`/api/classes/${props.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, description, link, password }),
    });
    if (infoResponse.ok) {
      const classrooms = await fetchClassrooms(currentUser.id);
      dispatch(setUserClasses(classrooms));
    }
  };
  const handleGroupSubmit = async () => {
    if (grouped) {
      const groupResponse = await fetch(
        `/api/classes/${props.id}/group/${groupSize}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (groupResponse.ok) {
        const classrooms = await fetchClassrooms(currentUser.id);
        dispatch(setUserClasses(classrooms));
      };
    } else {
      const unGroupResponse = await fetch(
        `/api/classes/${props.id}/group/${groupSize}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (unGroupResponse.ok) {
        const classrooms = await fetchClassrooms(currentUser.id);
        dispatch(setUserClasses(classrooms));
      };
    };
  };
  useEffect(() => {
    handleGroupSubmit();
  }, [grouped, groupSize])

  //Visual JSX Return
  return (
    <>
      <Grid item className="instructorCard">
        <Typography align="center" variant="h5" gutterBottom>
          Instructor
        </Typography>
        <UserCardContainer
          props={{ ...props.instructors[0], checked_in: true }}
        />
      </Grid>

      <Grid item className="groupingMenu">
        <Typography align="center" variant="subtitle2" gutterBottom>
          Groups
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Grouped</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={grouped}
            onChange={handleGroupedChange}
            disabled={!editMode}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Group Size
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={groupSize}
            onChange={handleGroupSizeChange}
            disabled={!editMode}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item className="instructorMessage">
        <Typography align="center" variant="subtitle2" gutterBottom>
          Class Details
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Daily Message"
            value={message}
            onChange={handleMessageChange}
            disabled={!editMode}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Course Description"
            multiline
            rowsMax={4}
            value={description}
            onChange={handleDescriptionChange}
            disabled={!editMode}
          />
        </form>
      </Grid>

      <Grid item className="meetingInfo">
        <Typography align="center" variant="subtitle2" gutterBottom>
          Meeting Details
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Meeting Link"
            value={link}
            onChange={handleLinkChange}
            disabled={!editMode}
          />
          <TextField
            id="standard-name"
            label="Meeting Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={!editMode}
          />
        </form>
      </Grid>

      <Grid item>
        {!editMode ? <Button className={classes.red} onClick={handleEditMode}>Edit</Button> : <Button color='primary' onClick={handleEditMode}>Save</Button>}
      </Grid>
    </>
  )
}
