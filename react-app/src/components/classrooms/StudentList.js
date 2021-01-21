import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
    addStudentToClassroom,
    enrollStudent,
    fetchEnrollment,
    getEnrolledStudents,
} from '../../store/enrolled';
import {
    fetchUnenrolled,
    getUnenrolledStudents,
    removeStudentFromClassroom,
    unenrollStudent,
} from '../../store/unenrolled';

const StudentList = ({ classroomId }) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const enrolled = useSelector((state) => state.enrolled);
    const unenrolled = useSelector((state) => state.unenrolled);
    // const [enrolled, setEnrolled] = useState([]);
    // const [unenrolled, setUnenrolled] = useState([]);

    useEffect(() => {
        (async () => {
            // get enrolled and unenrolled students
            const getEnrolled = await fetchEnrollment(classroomId);
            const getUnenrolled = await fetchUnenrolled(classroomId);
            // console.log('enrolled:');
            // console.log(enrolled);
            // console.log('unenrolled:');
            // console.log(unenrolled);
            // setEnrolled(getEnrolled);
            // setUnenrolled(getUnenrolled);
            dispatch(getEnrolledStudents(getEnrolled));
            dispatch(getUnenrolledStudents(getUnenrolled));
            setLoaded(true);
        })();
    }, [dispatch, classroomId]);

    const handleAdd = (id) => {
        alert(`You've clicked the student with id:${id}`);
        console.log(id);
    };

    const handleRemove = (id) => {
        alert(`You've clicked the student with id:${id}`);
        console.log(id);
    };

    return (
        <Grid container>
            <Grid item xs={12} md={12} sm={6}>
                <Typography className="student_list_header" variant="h6">
                    Enrolled
                </Typography>
                <div className="student_list">
                    {enrolled && Object.keys(enrolled).length > 0 ? (
                        <List>
                            {Object.values(enrolled).map((student) => {
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
                                                    id={student.id}
                                                    props={student.id}
                                                    onClick={() =>
                                                        handleRemove(student.id)
                                                    }
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
                    {unenrolled && Object.keys(unenrolled).length > 0 ? (
                        <List>
                            {Object.values(unenrolled).map((student) => {
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
                                                    value={student.id}
                                                    onClick={handleAdd}
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
