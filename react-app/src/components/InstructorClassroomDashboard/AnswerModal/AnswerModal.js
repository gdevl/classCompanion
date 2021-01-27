import React, { useContext } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchClassrooms,
    setUserClasses,
    setCurrentClassRoom,
} from '../../../../src/store/users';
import {
    getClassroomMeta,
    fetchClassroomData,
} from '../../../store/classroom_meta';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SocketContext from '../../../socketContext';

export default function AnswerModal({ open, setOpen, question }) {
    //   const socket = io.connect("http://localhost:5000");
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);

    const [answer, setAnswer] = React.useState('');
    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleDismiss = async () => {
        //implement question dismiss here
        const response = await fetch(
            `/api/classes/${currentClassroomId}/question/${question.id}/dismiss`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instructor_id: currentUser.id,
                    answer: 'dismissed',
                }),
            }
        );
        if (response.ok) {
            const classroom = await fetchClassroomData(currentClassroomId);
            dispatch(getClassroomMeta(classroom));
            socket.emit('dismiss', {
                answer: answer,
                classroom: currentClassroomId,
            });
            // setExpanded(null);
            setOpen(null);
        }
    };

    const handleSubmit = async () => {
        //implement form submission here
        const response = await fetch(
            `/api/classes/${currentClassroomId}/question/${question.id}/answer`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instructor_id: currentUser.id,
                    answer: answer,
                }),
            }
        );
        if (response.ok) {
            console.log('answer:');
            console.log(answer);
            socket.emit('answer', {
                answer: answer,
                classroom: currentClassroomId,
            });
            const classroom = await fetchClassroomData(currentClassroomId);
            dispatch(getClassroomMeta(classroom));
            setOpen(null);
        }

        // props.setOpen(null)
    };

    if (!question) return null;
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(null)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{`Name's Question`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{question.content}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="instructor_answer"
                        label="Answer"
                        type="text"
                        value={answer}
                        onChange={handleAnswerChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDismiss} color="primary">
                        Dismiss
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
