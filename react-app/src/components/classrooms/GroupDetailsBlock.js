import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import BreakGroups from "./BreakGroups";
import GroupCreation from "./GroupCreation";

const GroupDetailsBlock = ({ classMeta }) => {
    // const [grouped, setGrouped] = useState(
    //     classMeta.groups.length >= 1 ? true : false
    // );
    // const [groupSize, setGroupSize] = useState(
    //     classMeta.groups[0] ? classMeta.groups[0].members.length : 0
    // );

    // const handleGroupedChange = async (event) => {
    //     if (event.target.value === false) await setGroupSize(0);
    //     if (event.target.value !== false) await setGroupSize(2);
    //     await setGrouped(event.target.value);
    //     // makeGroups();
    // };
    // const handleGroupSizeChange = async (event) => {
    //     await setGroupSize(event.target.value);
    //     // makeGroups();
    // };

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
            {classMeta["groups"].length === 0 ? (
                <>
                    <div className="grouping__menu">
                        <p>You haven't defined any groups yet!</p>
                        <GroupCreation
                            classroomId={classMeta.id}
                            makeGroups={makeGroups}
                        />
                    </div>
                </>
            ) : (
                <>
                    <p>Students divided into groups of </p>
                    <BreakGroups
                        classroomId={classMeta.id}
                        breakGroups={breakGroups}
                    />
                </>
            )}
        </>
    );
};

export default GroupDetailsBlock;
