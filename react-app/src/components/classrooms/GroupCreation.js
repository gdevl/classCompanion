import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../store/classroom_meta';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
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

const GroupCreation = ({ classroomId, makeGroups }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [groupSize, setGroupSize] = useState(null);

    const handleGroupSize = (event) => {
        setGroupSize(event.target.value);
    };

    useEffect(() => {
        console.log('make groups');
        makeGroups(classroomId, groupSize);
    }, [groupSize]);

    const fetchClassroomData = () => {};

    useEffect(() => {
        console.log('make groups');
        (async () => {
            const query = await fetchClassroomData(classroomId);
            dispatch(getClassroomMeta(query));
        })();
    }, []);

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
};

export default GroupCreation;
