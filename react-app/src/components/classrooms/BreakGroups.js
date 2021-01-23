import React from "react";

const BreakGroups = ({ classroomId, breakGroups }) => {
    const handleUngroup = () => {
        breakGroups(classroomId);
    };

    return <button onClick={() => handleUngroup()}>Ungroup</button>;
};

export default BreakGroups;
