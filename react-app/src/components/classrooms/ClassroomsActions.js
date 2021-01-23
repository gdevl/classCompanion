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

const ClassroomsActions = ({ classroomId, classroomName }) => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.currentUser.role);
    const [open, setOpen] = useState(false);
    const [activeClassroom, setActiveClassroom] = useState(null);
    const [hideEnrollment, setHideEnrollment] = useState(true);

    const handleClose = () => {
        setActiveClassroom(null);
        setOpen(false);
        dispatch(clearEnrolledStudents());
        dispatch(clearUnenrolledStudents());
    };

    const handleViewClassroom = async () => {
        dispatch(setCurrentClassroom(classroomId));
    };

    const handleDeleteClassroom = async () => {
        const classroomToDelete = await deleteClassroom(classroomId);
        dispatch(removeClassroom(classroomToDelete));
    };

    const handleEnrollment = () => {
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
                ) : (
                    <button className="use-me-for-spacing">Enrollment</button>
                )}
                {role === 'instructor' ? (
                    <button onClick={handleDeleteClassroom}>Delete</button>
                ) : (
                    <button className="use-me-for-spacing">Delete</button>
                )}
            </div>
            {!hideEnrollment ? (
                <div className="transfer_list_dialog">
                    <Dialog open={open} onClose={handleClose}>
                        <div className="transfer_list__title-bar">
                            <h3>{`${classroomName} Enrollment`}</h3>
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
