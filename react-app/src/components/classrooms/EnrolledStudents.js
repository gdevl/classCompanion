import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const EnrolledStudents = ({ roster, unenrollStudent }) => {
    const enrolled = roster.all.filter((student) =>
        roster.enrolled.includes(student.id)
    );

    return (
        <>
            {enrolled.map((student) => (
                <ListItem key={student.id} className="student_list_item">
                    <ListItemAvatar>
                        <Avatar src={`${student.avatar_url}`} />
                    </ListItemAvatar>
                    <ListItemText primary={student.name} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Remove" aria-label="Remove">
                            <IconButton
                                edge="end"
                                color="primary"
                                id={student.id}
                                onClick={() => unenrollStudent(student.id)}
                            >
                                <RemoveCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </>
    );
};

export default EnrolledStudents;
