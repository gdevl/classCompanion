import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addClassroom, createClassroom } from '../../store/classrooms';

const AddClassroom = ({ userId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');

    const handleClassName = (e) => {
        setClassName(e.target.value);
    };

    const handleClassDescription = (e) => {
        setClassDescription(e.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        const classroomData = {
            userId,
            className,
            classDescription,
        };
        setOpen(false);
        const newClassroom = await createClassroom(classroomData);
        dispatch(addClassroom(newClassroom));
    };

    return (
        <div className="add_classroom_action">
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
            >
                Add Classroom
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Classroom</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new classroom, please provide a name and
                        description.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="classname"
                        label="Class Name"
                        type="text"
                        value={className}
                        onChange={handleClassName}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="classdescription"
                        label="Description"
                        type="text"
                        value={classDescription}
                        onChange={handleClassDescription}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Discard
                    </Button>
                    <Button onClick={() => handleCreate()} oncolor="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddClassroom;
