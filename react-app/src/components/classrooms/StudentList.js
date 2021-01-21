import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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

    useEffect(() => {
        (async () => {
            // get enrolled and unenrolled students
            const getEnrolled = await fetchEnrollment(classroomId);
            const getUnenrolled = await fetchUnenrolled(classroomId);
            dispatch(getEnrolledStudents(getEnrolled));
            dispatch(getUnenrolledStudents(getUnenrolled));
            setLoaded(true);
        })();
    }, [dispatch, classroomId, enrolled, unenrolled]);

    const handleAdd = async (userId) => {
        const enrollmentData = {
            userId,
            classroomId,
        };
        const studentToAdd = await addStudentToClassroom(enrollmentData);
        if (studentToAdd.ok) {
            dispatch(enrollStudent(studentToAdd));
        }
    };

    const handleRemove = async (userId) => {
        const enrollmentData = {
            userId,
            classroomId,
        };
        const studentToRemove = await removeStudentFromClassroom(
            enrollmentData
        );
        if (studentToRemove.ok) {
            dispatch(unenrollStudent(studentToRemove));
        }
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
                                                    userId={student.id}
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
                                                    userId={student.id}
                                                    onClick={() =>
                                                        handleAdd(student.id)
                                                    }
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
