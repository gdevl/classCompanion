import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const AllStudents = ({ roster, enrollStudent }) => {
    const unenrolled = roster.all.filter(
        (student) => !roster.enrolled.includes(student.id)
    );

    return (
        <>
            {unenrolled.map((student) => (
                <ListItem key={student.id} className="student_list_item">
                    <ListItemAvatar>
                        <Avatar src={`${student.avatar_url}`} />
                    </ListItemAvatar>
                    <ListItemText primary={student.name} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Remove" aria-label="Remove">
                            <IconButton
                                edge="end"
                                color="secondary"
                                id={student.id}
                                onClick={() => enrollStudent(student.id)}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </>
    );
};

export default AllStudents;
