import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AnswerModal({ props }) {

  const handleSubmit = () => {
    //implement form submission here
    props.setOpen(null)
  }

  const handleDismiss = () => {
    //implement question dismiss here
    props.setOpen(null)
  }

  if(!props) return null
  return (
    <>

        <Dialog open={props.open == props.user.id} onClose={() => props.setOpen(null)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`${props.user.first_name}'s Question`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.question}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="instructor_answer"
            label="Answer"
            type="text"
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
