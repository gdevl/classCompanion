import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BreakGroups from "./BreakGroups";

// import {
//     getClassroomMeta,
//     fetchClassroomData,
// } from "../../store/classroom_meta";

import { setClassGroups } from "../../store/groups";
import { getRoster, fetchRoster } from "../../store/roster";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GroupCreation = ({
    classroomId,
    makeGroups,
    grouped,
    setGrouped,
    breakGroups,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [groupSize, setGroupSize] = useState(null);

    const handleGroupSize = (event) => {
        setGroupSize(event.target.value);
        setGrouped(true);
        const groupData = makeGroups(classroomId, event.target.value);
        dispatch(setClassGroups(groupData));
    };

    useEffect(() => {
        (async () => {
            const request = await fetchRoster(classroomId);
            dispatch(getRoster(request));
        })();
    }, []);

    useEffect(() => {
        if (groupSize !== null) {
            makeGroups(classroomId, groupSize);
        }
    }, [setGrouped]);

    if (!grouped) {
        return (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Group Size
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={groupSize}
                        onChange={handleGroupSize}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
            </>
        );
    } else {
        return (
            <>
                <BreakGroups
                    classroomId={classroomId}
                    breakGroups={breakGroups}
                    setGrouped={setGrouped}
                />
            </>
        );
    }
};

export default GroupCreation;
