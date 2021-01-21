import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentClassroom } from '../../store/current_classroom';
import { removeClassroom, deleteClassroom } from '../../store/classrooms';
import { clearEnrolledStudents } from '../../store/enrolled';
import { clearUnenrolledStudents } from '../../store/unenrolled';
import TransferList from './TransferList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ClassroomsActions = ({ classroomId }) => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.currentUser.role);
    const userId = useSelector((state) => state.currentUser.id);
    const [open, setOpen] = useState(false);
    const [activeClassroom, setActiveClassroom] = useState(null);
    const [hideEnrollment, setHideEnrollment] = useState(true);

    const handleClose = () => {
        setActiveClassroom(null);
        setOpen(false);
        dispatch(clearEnrolledStudents());
        dispatch(clearUnenrolledStudents());
    };

    const handleViewClassroom = async (e) => {
        e.preventDefault();
        dispatch(setCurrentClassroom(classroomId));
    };

    const handleDeleteClassroom = async (e) => {
        const classroomToDelete = await deleteClassroom(classroomId);
        dispatch(removeClassroom(classroomToDelete));
    };

    const handleEnrollment = (e) => {
        console.log('classroomId:');
        console.log(classroomId);
        setHideEnrollment(false);
        setOpen(true);
        setActiveClassroom(classroomId);
    };

    return (
        <>
            <div className="classrooms__actions">
                <button onClick={handleViewClassroom}>View</button>
                {role === 'instructor' ? (
                    <button onClick={handleEnrollment}>Enrollment</button>
                ) : null}
                {role === 'instructor' ? (
                    <button onClick={handleDeleteClassroom}>Delete</button>
                ) : null}
            </div>
            {!hideEnrollment ? (
                <div className="transfer_list_dialog">
                    <Dialog open={open} onClose={handleClose}>
                        <div className="transfer_list__title-bar">
                            <h3>{`Add / Remove Students`}</h3>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <DialogContent>
                            <TransferList classroomId={classroomId} />
                        </DialogContent>
                    </Dialog>
                </div>
            ) : null}
        </>
    );
};

export default ClassroomsActions;
