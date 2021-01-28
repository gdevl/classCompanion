import React, { useContext, useEffect, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { useDispatch, useSelector } from 'react-redux';
import { checkInStudent, postStudentCheckIn } from '../../store/classroom_meta';

const CheckInBlock = () => {
    const { classroomId, attendance, currentUser } = useContext(
        ClassroomContext
    );
    const dispatch = useDispatch();

    const handleCheckIn = async () => {
        const request = await postStudentCheckIn(classroomId, currentUser.id);
        dispatch(checkInStudent(currentUser.id));
    };

    return (
        <section className="classroom__grid-item-top bg-purple">
            <h3>Check In</h3>
            {attendance ? (
                <>
                    {attendance.includes(currentUser.id) ? (
                        <p>You're all checked in. Hooray!</p>
                    ) : (
                        <>
                            <p>Let everyone know you're here!</p>
                            <button
                                onClick={handleCheckIn}
                                className="student_check_in"
                            >
                                Check-In
                            </button>
                        </>
                    )}
                </>
            ) : null}
        </section>
    );
};

export default CheckInBlock;
