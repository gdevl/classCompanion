import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';
import { setClassGroups, fetchClassGroups } from '../../store/groups';
import ClassroomContainer from './ClassroomContainer';

const SingleClassroom = ({ userId }) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const attendance = useSelector((state) => state.attendance);

    useEffect(() => {
        (async () => {
            const query = await fetchClassroomData(currentClassroomId);
            dispatch(getClassroomMeta(query));
        })();
        setLoaded(true);
    }, [currentClassroomId]);

    useEffect(() => {
        (async () => {
            const groupData = await fetchClassGroups(currentClassroomId);
            dispatch(setClassGroups(groupData));
        })();
    }, [currentClassroomId]);

    if (!currentUser) return null;
    if (!classMeta) return null;

    if (!loaded) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {classMeta.id !== null ? (
                <ClassroomContainer
                    classMeta={classMeta}
                    role={currentUser.role}
                    userId={userId}
                    attendance={attendance}
                />
            ) : null}
        </>
    );
};

export default SingleClassroom;
