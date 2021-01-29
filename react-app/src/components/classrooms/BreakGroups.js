import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ClassroomContext } from './SingleClassroom';
import { SocketContext } from '../../index';
import { clearClassGroups } from '../../store/groups';

const BreakGroups = ({ breakGroups }) => {
    const { classroomId } = useContext(ClassroomContext);
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const handleUngroup = () => {
        breakGroups(classroomId);
        dispatch(clearClassGroups());
        const data = {
            classroomId,
        };
        socket.emit('ungroup_students', data, (response) => {
            console.log(response);
        });
    };

    return (
        <div className="classrooms__actions">
            <button className="ungroup" onClick={() => handleUngroup()}>
                Ungroup
            </button>
        </div>
    );
};

export default BreakGroups;
