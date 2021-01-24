import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';

const BreakGroups = ({ classroomId, breakGroups }) => {
    const dispatch = useDispatch();
    const handleUngroup = () => {
        breakGroups(classroomId);
    };

    useEffect(() => {
        console.log('break groups');
        (async () => {
            const query = await fetchClassroomData(classroomId);
            dispatch(getClassroomMeta(query));
        })();
    }, [handleUngroup]);

    return <button onClick={handleUngroup}>Ungroup</button>;
};

export default BreakGroups;
