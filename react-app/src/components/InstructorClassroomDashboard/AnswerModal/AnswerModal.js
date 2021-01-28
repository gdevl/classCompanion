import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ClassroomContext } from '../../classrooms/SingleClassroom';
import { answerQuestion, patchAnswer } from '../../../store/questions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SocketContext from '../../../socketContext';

export default function AnswerModal({ open, setOpen, question }) {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const { currentUser, classroomId } = useContext(ClassroomContext);
    const [answer, setAnswer] = useState('');

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = async () => {
        const request = await patchAnswer(classroomId, question.id, answer);
        console.log('request: ', request);
        dispatch(answerQuestion(answer, question));
        setOpen(false);
        if (request.ok) {
            console.log('answer:');
            console.log(answer);
            socket.emit('answer', {
                answer: answer,
                classroom: classroomId,
            });
        }
    };

    if (!question) return null;
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
