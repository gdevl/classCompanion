import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { red, blue } from '@material-ui/core/colors';
import UserCardContainer from '../UserCard/UserCardContainer'
import './DashboardHeader.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
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
  }
}));

export default function DashboardHeader({ props }) {

  const classes = useStyles();
  const [editMode, setEditMode] = React.useState(false);
  const [grouped, setGrouped] = React.useState(false);
  const [groupSize, setGroupSize] = React.useState(null);
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
    if(event.target.value === false) setGroupSize(null)
    setGrouped(event.target.value);
  };
  const handleGroupSizeChange = (event) => {
    setGroupSize(event.target.value);
  }
  const handleLinkChange = (event) => {
    setLink(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleEditMode = () => {
    if (!editMode) setEditMode(true)
    else {
      //IMPLEMENT POST PROCEDURES HERE!!!!!!!!

      setEditMode(false)
    }
  }

  return (
    <>
      <Box className='instructorCard'>
        <UserCardContainer props={{...props.instructors[0], checked_in: true}} />
      </Box>

      <Box className='groupingMenu'>
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
          <InputLabel id="demo-simple-select-helper-label">Group Size</InputLabel>
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
      </Box>
      <Box className='instructorMessage'>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-name" label="Daily Message" value={message} onChange={handleMessageChange} disabled={!editMode} />
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
      </Box>

      <Box className='meetingInfo'>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-name" label="Meeting Link" value={link} onChange={handleLinkChange} disabled={!editMode} />
          <TextField id="standard-name" label="Meeting Password" value={password} onChange={handlePasswordChange} disabled={!editMode} />
        </form>
      </Box>

      <Box className='editButtonContainerContainer'>
        <Box className='editButtonContainer'>
          <IconButton aria-label="edit mode" onClick={handleEditMode} className={editMode ? classes.red : classes.blue}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
