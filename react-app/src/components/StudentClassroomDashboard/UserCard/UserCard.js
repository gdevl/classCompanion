import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PanToolIcon from '@material-ui/icons/PanTool';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import './UserCard.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '15em',
    margin: '1em',
    minHeight: '8em',
  },
  hidden: {
    display: 'none',
  },
  // checkedIn: {
  //   border: '1px solid blue',
  //   border: '5px solid #EE4266',
  //   border: '2px solid blue',
  //   opacity: '70%',
  //   width: '15em',
  //   margin: '1em',
  //   minHeight: '8em',
  // },
  // checkedOut: {
  //   border: '1px solid red',
  //   border: '5px solid #EE4266',
  //   border: '2px solid red',
  //   opacity: '70%',
  //   width: '15em',
  //   margin: '1em',
  //   minHeight: '8em',
  // },
  checkedIn: {
    border: '2px solid blue',
    width: '15em',
    margin: '1em',
    minHeight: '8em',
  },
  checkedOut: {
    border: '2px solid red',
    opacity: '70%',
    width: '15em',
    margin: '1em',
    minHeight: '8em',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  handIcon: {
    color: red[500],
  },
  cardActionsContainer: {
    paddingLeft: '16px',
  },
  userInfoBox: {
    maxWidth: '70%',
    overflow: 'hidden',
  },
}));

export default function UserCard({ props }) {
  const classes = useStyles();

  //GRAB STUDENT INFO FROM CLASS
  const currentState = useSelector(state => state.store)
  const currentClass = currentState.classrooms[currentState.current_class.id]
  //FUNCTIONS FOR GRABBING USER INFO FROM CLASS
  const checkedIn = (student_id) => {
    let checkedIn = false
    if (props.role === 'instructor') checkedIn = true
    let today = new Date();
    currentClass.check_ins.forEach(checkIn => {
      let checkInDay = new Date(checkIn.created_on)
      if (checkIn.student_id === student_id
        && today.getFullYear() == checkInDay.getFullYear()
        && today.getMonth() == checkInDay.getMonth()
        && today.getDate() == checkInDay.getDate()
      ) {
        checkedIn = true
      }
    })
    return checkedIn
  }

  if (!props) return null
  const user = props
  return (
    <>
      <Card key={user.id} className={checkedIn(user.id) ? classes.checkedIn : classes.checkedOut}>
        <CardHeader
          avatar={
            <Avatar aria-label="avatar" className={classes.avatar} src={user.avatar_url ? user.avatar_url : ''}>
              {user.avatar_url ? '' : user.first_name.slice(0, 1)}
            </Avatar>
          }
        />

        <CardActions disableSpacing className={classes.cardActionsContainer}>
          <Box className={classes.userInfoBox}>
            <Typography> {user.username ? user.username : `${user.first_name} ${user.last_name}`} </Typography>
            <Typography> {user.email} </Typography>
          </Box>
        </CardActions>

      </Card>
    </>
  )
}
