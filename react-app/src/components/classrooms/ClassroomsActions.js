import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentClassroom } from '../../store/current_classroom';

const ClassroomsActions = ({ role, classroom }) => {
    const dispatch = useDispatch();
    const handleViewClassroom = async (e) => {
        e.preventDefault();
        dispatch(setCurrentClassroom(e.target.value));
    };

    return (
        <div className="classrooms__actions">
            <button value={classroom.id} onClick={handleViewClassroom}>
                View
            </button>
            {role === 'instructor' ? (
                <button value={classroom.id} onClick={handleViewClassroom}>
                    Enroll
                </button>
            ) : null}
            {role === 'instructor' ? (
                <button value={classroom.id} onClick={handleViewClassroom}>
                    Delete
                </button>
            ) : null}
        </div>
    );
};

export default ClassroomsActions;
