import React, { useContext, useEffect, useState } from 'react';
import { ClassroomContext } from './SingleClassroom';
import { useDispatch, useSelector } from 'react-redux';
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { fetchClassGroups, setClassGroups } from '../../store/groups';
import { setGroupsDefined } from '../../store/define_groups';

const GroupCreation = ({ makeGroups }) => {
    const { classroomId } = useContext(ClassroomContext);
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
                    classes={{
                        root: minimalSelectClasses.select,
                    }}
                    style={{ fontFamily: 'Mukta, sans-serif !important' }}
                    labelId="group_size_label"
                    id="group_size"
                    IconComponent={iconComponent}
                    MenuProps={menuProps}
                    value={groupSize}
                    onChange={handleUpdateGroupSize}
                >
                    <MenuItem value={0}>Group Size</MenuItem>
                    <MenuItem value={1}>
                        <PersonIcon /> &nbsp;Groups of 1
                    </MenuItem>
                    <MenuItem value={2}>
                        <PersonIcon />
                        <PersonIcon />
                        &nbsp;Groups of 2
                    </MenuItem>
                    <MenuItem value={3}>
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        &nbsp;Groups of 3
                    </MenuItem>
                    <MenuItem value={4}>
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        &nbsp;Groups of 4
                    </MenuItem>
                    <MenuItem value={5}>
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        <PersonIcon />
                        &nbsp;Groups of 5
                    </MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default GroupCreation;
