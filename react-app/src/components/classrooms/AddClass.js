import React, { useState } from 'react';
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

  classModal: {
    position: 'absolute',
    top: 300,
    left: 550,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  addClassSubmitButton: {
    marginTop: '10px'
  },

}));


const AddClass = () => {

  const classes = useStyles()

  const [className, setClassName] = useState('')
  const [classDescription, setClassDescription] = useState('')
  const [classTime, setClassTime] = useState('')
  const [modalOpen, setModalOpen] = useState(false)


  const handleInputChange = (e) => {
    if(e.target.id === 'name-input') {
      setClassName(e.target.value)
      // console.log(className)
    } else if(e.target.id === 'description-input') {
      setClassDescription(e.target.value)
    } else {
      setClassTime(e.target.value)
    }
  }

  const submitClass = async () => {
    const body = {
      className,
      classDescription,
      classTime
    }

    // const res = await fetch(`api/users/${userId}/classes/create`, {

    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body)
    // })
    // alert('Class Created:')
    console.log(body)
  }

  const handleCreateClass = (e) => {
    e.preventDefault()
    setModalOpen(false)
    submitClass()
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }


  const addClassBody = (
    <div className={classes.classModal}>
      <h2 id="simple-modal-title">Class Info:</h2>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      <div>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input id="name-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="description-input">Description</InputLabel>
          <Input id="description-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="timeslot-input">Time Slot</InputLabel>
          <Input id="timeslot-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <Button variant="contained" color="primary" style={{ color: "white" }} size="small" className={classes.addClassSubmitButton} onClick={handleCreateClass} type='submit'>Create Class</Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {addClassBody}
    </Modal>
  )
}

export default AddClass;
