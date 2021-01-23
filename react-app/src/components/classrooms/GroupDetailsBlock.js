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

const GroupDetailsBlock = ({ classMeta }) => {
    const classes = useStyles();
    const [grouped, setGrouped] = useState(
        classMeta.groups.length >= 1 ? true : false
    );
    const [groupSize, setGroupSize] = useState(
        classMeta.groups[0] ? classMeta.groups[0].members.length : 0
    );

    const handleGroupedChange = async (event) => {
        if (event.target.value === false) await setGroupSize(0);
        if (event.target.value !== false) await setGroupSize(2);
        await setGrouped(event.target.value);
        // makeGroups();
    };
    const handleGroupSizeChange = async (event) => {
        await setGroupSize(event.target.value);
        // makeGroups();
    };

    const breakGroups = async () => {
        const ungroup = await fetch(`/api/classes/${classMeta.id}/ungroup`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <>
            <h3>Group Creation</h3>
            {classMeta["groups"].length === 0 ? (
                <>
                    <Grid item className="groupingMenu">
                        <Typography
                            align="center"
                            variant="subtitle2"
                            gutterBottom
                        >
                            Groups
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Grouped
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={grouped}
                                onChange={handleGroupedChange}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Group Size
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={groupSize}
                                onChange={handleGroupSizeChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            ) : (
                <>
                    <p>Students divided into groups of {groupSize} </p>
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
