import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { fetchClassGroups, setClassGroups } from '../../store/groups';
import { setGroupsDefined } from '../../store/define_groups';

const GroupCreation = ({ classroomId, makeGroups }) => {
    const minimalSelectClasses = useMinimalSelectStyles();

    // moves the menu below the select input
    const menuProps = {
        classes: {
            paper: minimalSelectClasses.paper,
            list: minimalSelectClasses.list,
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        getContentAnchorEl: null,
    };

    const iconComponent = (props) => {
        return (
            <ExpandMoreIcon
                className={props.className + ' ' + minimalSelectClasses.icon}
            />
        );
    };

    const dispatch = useDispatch();
    const [groupSize, setGroupSize] = useState(0);

    const handleUpdateGroupSize = async (event) => {
        setGroupSize(event.target.value);
        (async () => {
            const groupCreationData = makeGroups(
                classroomId,
                event.target.value
            );
        })();
    };

    useEffect(() => {
        if (groupSize > 0) {
            (async () => {
                const groupData = await fetchClassGroups(classroomId);
                dispatch(setClassGroups(groupData));
                dispatch(setGroupsDefined(true));
            })();
        }
    }, [handleUpdateGroupSize]);

    return (
        <>
            <FormControl className="group_creation-container">
                <Select
                    disableUnderline
                    classes={{ root: minimalSelectClasses.select }}
                    labelId="group_size_label"
                    id="group_size"
                    IconComponent={iconComponent}
                    MenuProps={menuProps}
                    value={groupSize}
                    onChange={handleUpdateGroupSize}
                >
                    <MenuItem value={0}>Group Size</MenuItem>
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
