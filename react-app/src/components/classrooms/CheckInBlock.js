import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkInStudent,
    patchStudentCheckIn,
} from '../../store/classroom_meta';

const CheckInBlock = ({ classMeta, userId }) => {
    const dispatch = useDispatch();

    const handleCheckIn = async () => {
        const request = await patchStudentCheckIn(classMeta['id'], userId);
        dispatch(checkInStudent(userId));
    };

    return (
        <>
            <h3>Check In</h3>
            {classMeta['attendance'] ? (
                <>
                    {classMeta['attendance'].includes(userId) ? (
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
        </>
    );
};

export default CheckInBlock;
