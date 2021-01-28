import React, { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Typography,
    Button,
    Modal,
    TextField,
} from '@material-ui/core';
import { fetchClassrooms, setUserClasses } from '../../../../src/store/users';
import {
    getClassroomMeta,
    fetchClassroomData,
    patchQuestionAcceptance,
    acceptAnswer,
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
        minWidth: '25rem',
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

export default function AnswerView({ open, setOpen, question }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleAnswer = async () => {
        // const response = await fetch(
        //     `/api/classes/${question.class_id}/question/${question.id}/accept`,
        //     {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(body)
        //     }
        // );

        const response = await patchQuestionAcceptance(question.class_id, question.id);
        console.log('response: ', response);
        dispatch(acceptAnswer(question));
        handleClose();
        if (response.ok) {
            // const classroom = await fetchClassroomData(question.class_id);
            // dispatch(getClassroomMeta(classroom));
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    console.log('question: ', question);

    return (
        <div className="answer__container">
            <button onClick={() => setOpen(true)}>View Answer</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
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
                            onSubmit={handleAnswer}
                        >
                            {/* <form className={classes.paper} noValidate autoComplete='off'> */}
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
                                {`${question.content}?`}
                            </Typography>
                            <Typography variant="h5">
                                {`${question.answer}`}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                onClick={handleAnswer}
                            >
                                Accept
                            </Button>
                        </form>
                    </Typography>
                </Fade>
            </Modal>
        </div>
    );
}
