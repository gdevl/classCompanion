import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentClassroom } from '../../store/current_classroom';
import { removeClassroom, deleteClassroom } from '../../store/classrooms';
import EnrollStudents from './EnrollStudents';

const ClassroomsActions = ({ role, classroom }) => {
    const dispatch = useDispatch();
    const [hideEnrollment, setHideEnrollment] = useState(true);

    const handleViewClassroom = async (e) => {
        e.preventDefault();
        dispatch(setCurrentClassroom(e.target.value));
    };

    const handleDeleteClassroom = async (e) => {
        const classroomToDelete = await deleteClassroom(e.target.value);
        dispatch(removeClassroom(classroomToDelete));
    };

    const handleEnrollment = () => {
        setHideEnrollment(false);
    };

    return (
        <>
            <div className="classrooms__actions">
                <button value={classroom.id} onClick={handleViewClassroom}>
                    View
                </button>
                {role === 'instructor' ? (
                    <button value={classroom.id} onClick={handleEnrollment}>
                        Enroll
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
            {!hideEnrollment ? <EnrollStudents /> : null}
        </>
    );
};

export default ClassroomsActions;
