import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearClassGroups } from "../../store/groups";
import { setGroupsDefined } from "../../store/define_groups";

const BreakGroups = ({ classroomId, breakGroups }) => {
    const dispatch = useDispatch();

    const handleUngroup = () => {
        breakGroups(classroomId);
        dispatch(setGroupsDefined(false));
        dispatch(clearClassGroups());
    };

    return <button onClick={() => handleUngroup()}>Ungroup</button>;
};

export default BreakGroups;
