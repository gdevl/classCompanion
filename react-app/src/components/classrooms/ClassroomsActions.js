import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentClassroom } from '../../store/current_classroom';
import { removeClassroom, deleteClassroom } from '../../store/classrooms';
import EnrollStudents from './EnrollStudents';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const ClassroomsActions = ({ role, classroom }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [activeClassroom, setActiveClassroom] = useState(null);
    const [hideEnrollment, setHideEnrollment] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleViewClassroom = async (e) => {
        e.preventDefault();
        dispatch(setCurrentClassroom(e.target.value));
    };

    const handleDeleteClassroom = async (e) => {
        const classroomToDelete = await deleteClassroom(e.target.value);
        dispatch(removeClassroom(classroomToDelete));
    };

    const handleEnrollment = (e) => {
        setHideEnrollment(false);
        setOpen(true);
        setActiveClassroom(e.target.value);
    };

    return (
        <>
            <div className="classrooms__actions">
                <button value={classroom.id} onClick={handleViewClassroom}>
                    View
                </button>
                {role === 'instructor' ? (
                    <button value={classroom.id} onClick={handleEnrollment}>
                        Enrollment
                    </button>
                ) : null}
                {role === 'instructor' ? (
                    <button
                        value={classroom.id}
                        onClick={handleDeleteClassroom}
                    >
                        Delete
                    </button>
                ) : null}
            </div>
            {/* {!hideEnrollment ? (
                <EnrollStudents classroomId={activeClassroom} />
            ) : null} */}
            {!hideEnrollment ? (
                <div className="transfer_list_dialog">
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                            <EnrollStudents classroomId={activeClassroom} />
                        </DialogContent>
                    </Dialog>
                </div>
            ) : null}
        </>
    );
};

export default ClassroomsActions;
