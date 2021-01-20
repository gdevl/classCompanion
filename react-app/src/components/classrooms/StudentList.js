import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchEnrollment, getEnrolledStudents } from '../../store/enrolled';
import { fetchUnenrolled, getUnenrolledStudents } from '../../store/unenrolled';

function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

const StudentList = ({ classroomId }) => {
    const [loaded, setLoaded] = useState(false);
    const [enrolled, setEnrolled] = useState([]);
    const [unenrolled, setUnenrolled] = useState([]);

    useEffect(() => {
        (async () => {
            // get enrolled and unenrolled students
            const getEnrolled = await fetchEnrollment(classroomId);
            const getUnenrolled = await fetchUnenrolled(classroomId);
            // console.log('enrolled:');
            // console.log(enrolled);
            // console.log('unenrolled:');
            // console.log(unenrolled);
            setEnrolled(getEnrolled);
            setUnenrolled(getUnenrolled);
            setLoaded(true);
        })();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} md={12} sm={6}>
                <Typography className="student_list_header" variant="h6">
                    Enrolled
                </Typography>
                <div className="student_list">
                    {loaded ? (
                        <List>
                            {enrolled.map((student) => {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={`${student.avatar_url}`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={student.name}
                                            className="student_list_item"
                                            // secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip
                                                title="Remove"
                                                aria-label="Remove"
                                            >
                                                <IconButton
                                                    edge="end"
                                                    color="primary"
                                                >
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <p>Loading ...</p>
                    )}
                </div>
            </Grid>
            <Grid item xs={12} md={12} sm={6}>
                <Typography className="student_list_header" variant="h6">
                    Unenrolled
                </Typography>
                <div className="student_list">
                    {loaded ? (
                        <List>
                            {unenrolled.map((student) => {
                                return (
                                    <ListItem className="student_list_item">
                                        <ListItemAvatar>
                                            <Avatar
                                                src={`${student.avatar_url}`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={student.name}
                                            // secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip
                                                title="Add"
                                                aria-label="add"
                                            >
                                                <IconButton
                                                    edge="end"
                                                    color="secondary"
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <p>Loading ...</p>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default StudentList;
