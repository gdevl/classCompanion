import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentClassroom } from '../../store/current_classroom';
import { removeClassroom, deleteClassroom } from '../../store/classrooms';

const ClassroomsActions = ({ role, classroom }) => {
    const dispatch = useDispatch();
    const handleViewClassroom = async (e) => {
        e.preventDefault();
        dispatch(setCurrentClassroom(e.target.value));
    };

    const handleDeleteClassroom = async (e) => {
        // alert(`you clicked the delete button`);
        const classroomToDelete = await deleteClassroom(e.target.value);
        dispatch(removeClassroom(classroomToDelete));
    };

    const handleEnrollment = () => {
        alert(`you clicked the enroll button`);
    };

    return (
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
                <button value={classroom.id} onClick={handleDeleteClassroom}>
                    Delete
                </button>
            ) : null}
        </div>
    );
};

export default ClassroomsActions;
