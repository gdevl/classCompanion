import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreakGroups from "./BreakGroups";
import GroupCreation from "./GroupCreation";
import { setGroupsDefined } from "../../store/define_groups";
import {
    setClassGroups,
    fetchClassGroups,
    clearClassGroups,
} from "../../store/groups";

const GroupDetailsBlock = ({ classMeta }) => {
    const dispatch = useDispatch();
    const groups_defined = useSelector((state) => state.groups_defined);
    const groups = useSelector((state) => state.groups);

    console.log("GroupDetailsBlock, ln 17, groups: ", groups);

    useEffect(() => {
        if (Object.keys(groups).length > 0) {
            dispatch(setGroupsDefined(true));
        } else {
            dispatch(setGroupsDefined(false));
        }
    }, [groups]);

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

    return (
        <>
            <h3>Group Creation</h3>
            {!groups_defined ? (
                <>
                    <div className="grouping__menu">
                        <p>You haven't defined any groups yet!</p>
                        <GroupCreation
                            classroomId={classMeta.id}
                            makeGroups={makeGroups}
                            groups_defined={groups_defined}
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
                        groups_defined={groups_defined}
                    />
                </>
            )}
        </>
    );
};

export default GroupDetailsBlock;
