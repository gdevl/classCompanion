import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassrooms, setUserClasses } from '../../../../src/store/users'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AnswerModal({ props }) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.store.current_user)
  const currentClass = useSelector(state => state.store.current_class)

  const [answer, setAnswer] = React.useState('');
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  const handleDismiss = async () => {
    //implement question dismiss here
    const response = await fetch(`/api/classes/${currentClass.id}/question/${props.question.id}/dismiss`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructor_id: currentUser.id,
        answer: 'dismissed'
      }),
    });
    if (response.ok) {
      const classrooms = await fetchClassrooms(currentUser.id);
      dispatch(setUserClasses(classrooms))
      props.setOpen(null)
    }

    // props.setOpen(null)
  }

  const handleSubmit = async () => {
    //implement form submission here
    const response = await fetch(`/api/classes/${currentClass.id}/question/${props.question.id}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructor_id: currentUser.id,
        answer: answer
      }),
    });
    if (response.ok) {
      const classrooms = await fetchClassrooms(currentUser.id);
      dispatch(setUserClasses(classrooms))
      props.setOpen(null)
    }

    // props.setOpen(null)
  }

  if (!props) return null
  return (
    <>

      <Dialog open={props.open == props.user.id} onClose={() => props.setOpen(null)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`${props.user.first_name}'s Question`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.question.content}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="instructor_answer"
            label="Answer"
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDismiss} color="primary">
            Dismiss
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
