import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreakGroups from "./BreakGroups";
import GroupCreation from "./GroupCreation";

const GroupDetailsBlock = ({ classMeta }) => {
    const groups = useSelector((state) => state.groups);
    const allStudents = useSelector((state) => state.roster.all);
    const [grouped, setGrouped] = useState(Object.keys(groups).length > 0);

    const breakGroups = async () => {
        const ungroup = await fetch(`/api/classes/${classMeta.id}/ungroup`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const makeGroups = async (classroomId, groupSize) => {
        const groupResponse = await fetch(
            `/api/classes/${classroomId}/groups/${groupSize}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
        );
    };

    useEffect(() => {
        if (Object.keys(groups).length > 0) {
            setGrouped(true);
        }
    }, [setGrouped]);

    return (
        <>
            <h3>Group Creation</h3>
            {Object.keys(groups).length === 0 ? (
                <>
                    <div className="grouping__menu">
                        <p>You haven't defined any groups yet!</p>
                        <GroupCreation
                            classroomId={classMeta.id}
                            makeGroups={makeGroups}
                            setGrouped={setGrouped}
                            grouped={grouped}
                            breakGroups={breakGroups}
                        />
                    </div>
                </>
            ) : (
                <>
                    <p>
                        Students divided into groups of
                        {` ${Object.keys(groups).length}`}
                    </p>
                    <BreakGroups
                        classroomId={classMeta.id}
                        breakGroups={breakGroups}
                        setGrouped={setGrouped}
                        grouped={grouped}
                    />
                </>
            )}
        </>
    );
};

export default GroupDetailsBlock;
