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
import AnswerModalContainer from '../AnswerModal/AnswerModalContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15em',
    margin: '1em',
    minHeight: '8em',
  },
  hidden: {
    display: 'none',
  },
  checkedIn: {
    border: '1px solid blue',
  },
  checkedOut: {
    // border: '1px solid red',
    // border: '5px solid #EE4266',
    // border: '2px solid red',
    // opacity: '70%'
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
  const hasQuestion = (student_id) => {
    let activeQuestion = ''
    currentClass.questions.forEach(question => {
      if (question.student_id === student_id && question.resolved === false) {
        activeQuestion = question.content
      }
    })
    return activeQuestion;
  }
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

  //Card Question Expansion
  const [expanded, setExpanded] = React.useState(null);
  const handleExpandClick = (id) => {
    if (expanded == id) setExpanded(null);
    else setExpanded(id);
  };
  //Answer Modal Pop-up
  const [open, setOpen] = React.useState(null);
  const handleClickOpen = (id) => {
    setOpen(id);
  };

  if (!props) return null
  const user = props
  return (
    <>
      <Card key={user.id} className={checkedIn(user.id) ? [classes.root, classes.checkedIn] : [classes.root, classes.checkedOut]}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={user.avatar_url ? user.avatar_url : ''}>
              {user.avatar_url ? '' : user.first_name.slice(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="question" onClick={() => handleClickOpen(user.id)} className={hasQuestion(user.id) ? classes.handIcon : classes.hidden}>
              <PanToolIcon />
            </IconButton>
          }
        />
        <AnswerModalContainer props={{ user, open, setOpen, question: hasQuestion(user.id) }} />

        <CardActions disableSpacing className={classes.cardActionsContainer}>
          <Box className={classes.userInfoBox}>
            <Typography> {user.username ? user.username : `${user.first_name} ${user.last_name}`} </Typography>
            <Typography> {user.email} </Typography>
          </Box>
          <IconButton
            className={[clsx(classes.expand, { [classes.expandOpen]: expanded == user.id }), hasQuestion(user.id) ? '' : classes.hidden]}
            onClick={() => handleExpandClick(user.id)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded == user.id} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider />
            <Typography paragraph>Question:</Typography>
            <Typography paragraph>
              {hasQuestion(user.id) ? hasQuestion(user.id) : ''}
            </Typography>
          </CardContent>
        </Collapse>

      </Card>
    </>
  )
}
