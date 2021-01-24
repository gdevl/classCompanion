import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    getClassroomMeta,
    fetchClassroomData,
} from "../../store/classroom_meta";
import { clearClassGroups } from "../../store/groups";

const BreakGroups = ({ classroomId, breakGroups, setGrouped, grouped }) => {
    const dispatch = useDispatch();

    const handleUngroup = () => {
        breakGroups(classroomId);
        setGrouped(false);
    };

    useEffect(() => {
        dispatch(clearClassGroups());
    }, [grouped]);

    return <button onClick={() => handleUngroup()}>Ungroup</button>;
};

export default BreakGroups;
