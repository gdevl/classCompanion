import React, { useContext } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { UserContext } from '../../App';
import { SocketContext } from '../../index';
import { useDispatch } from 'react-redux';
import { checkInStudent, postStudentCheckIn } from '../../store/classroom_meta';

const CheckInBlock = () => {
    const currentUser = useContext(UserContext);
    const socket = useContext(SocketContext);
    const { classroomId, attendance } = useContext(ClassroomContext);
    const dispatch = useDispatch();

    const handleCheckIn = async () => {
        await postStudentCheckIn(classroomId, currentUser.id);
        dispatch(checkInStudent(currentUser.id));
        const data = {
            classroomId,
            studentId: currentUser.id,
        };
        socket.emit('checkin', data, (response) => {
            console.log(response);
        });
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
