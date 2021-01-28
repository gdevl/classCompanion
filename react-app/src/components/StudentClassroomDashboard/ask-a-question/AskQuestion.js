import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    Typography,
    Button,
    Modal,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'fontsource-roboto';
import SocketContext from '../../../socketContext';
import {
    fetchClassroomData,
    getClassroomMeta,
    postQuestion,
    submitQuestion
} from '../../../store/classroom_meta';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        outline: '0',
        border: '2px solid white',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        paddingLeft: '5rem',
        paddingRight: '5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    editHeading: {
        marginBottom: '1rem',
    },
    element: {
        padding: '1rem',
    },
    button: {
        marginTop: '2rem',
    },
    btnContainer: {
        position: 'relative',
        left: '72%',
        bottom: '100%',
    },
    exitBtn: {
        position: 'relative',
        bottom: '1.95rem',
        left: '10rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
    },
    avatar: {
        marginBottom: '1rem',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const AskQuestion = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const classes = useStyles();
    const [question, setQuestion] = useState('');

    // access current_user id object from redux store
    // ---------------------------------------
    // const id = localStorage.getItem('USERID')
    // ---------------------------------------
    //check form submission for updateProfile call

    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);

    const submitQuestion = async () => {
        console.log('question: ', question)
        const request = await postQuestion(currentClassroomId, currentUser.id, question);
        dispatch(submitQuestion(question));
        handleClose();
        if (request.ok) {
            socket.emit('question', {
                question: question,
                classroom: currentClassroomId,
            });
        }
    }

    // const postQuestion = async () => {
    //     const response = await fetch(
    //         `/api/classes/${currentClassroomId}/user/${currentUser.id}/question`,
    //         {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ question }),
    //         }
    //     );
    //     if (response.ok) {
    //         console.log('question:');
    //         console.log(question);
    //         socket.emit('question', {
    //             question: question,
    //             classroom: currentClassroomId,
    //         });
    //         const classroom = await fetchClassroomData(currentClassroomId);
    //         dispatch(getClassroomMeta(classroom));
    //     }
    //     handleClose();
    // };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="question__container">
            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Typography variant="h5">
                        <form
                            className={classes.paper}
                            noValidate
                            autoComplete="off"
                            onSubmit={submitQuestion}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                onClick={handleClose}
                                className={classes.exitBtn}
                                variant="outlined"
                            >
                                x
                            </Button>
                            <Typography
                                variant="h4"
                                className={classes.editHeading}
                            >
                                Ask a Question
                            </Typography>
                            <TextField
                                autoFocus
                                id="filled-multiline-static"
                                // label="Multiline"
                                multiline
                                rows={4}
                                // defaultValue="Default Value"
                                // variant="filled"
                                onChange={e => setQuestion(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
                            >
                                Submit
                            </Button>
                        </form>
                    </Typography>
                </Fade>
            </Dialog>
        </div>
    );
};

export default AskQuestion;
