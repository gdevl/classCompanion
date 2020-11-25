import React from 'react';
import { Avatar, Typography, Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // backgroundColor: 'white',
        border: '2px solid #000',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(4, 10, 4),
        paddingLeft: '5rem',
        paddingRight: '5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    element: {
        padding: '1rem',
    },
    icon: {


    },
    button: {
        marginTop: '1.5rem',
    },
    btnContainer: {
        position: 'relative',
        left: '72%',
        bottom: '100%',
    },
    exitBtn: {
        position: 'relative',
        bottom: '2rem',
        left: '9.6rem',
    }
}));

function EditProfile() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div className='profile-edit__container'>

            <button type="button" onClick={handleOpen}>
                Edit Profile
            </button>
            <Modal
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
                    <div className={classes.paper}>
                        {/* <div className={classes.btnContainer}> */}
                        <Button variant='contained' onClick={handleClose} className={classes.exitBtn} variant='outlined'>x</Button>
                        {/* </div> */}
                        <Typography variant='h4'>
                            Edit Profile
                        </Typography>
                        <div className={classes.element}>
                            <Typography variant='h5'>
                                <form className={classes.root} noValidate autoComplete='off'>
                                    <TextField id='standard-basic' label='Full Name' />
                                </form>
                            </Typography>
                        </div>
                        <div className={classes.element}>
                            <Typography variant='h5'>
                                <form className={classes.root} noValidate autoComplete='off'>
                                    <TextField id='standard-basic' label='Email' />
                                </form>
                            </Typography>
                        </div>
                        <div className={classes.element}>
                            <Typography variant='h5'>
                                <form className={classes.root} noValidate autoComplete='off'>
                                    <TextField id='standard-basic' label='Password' />
                                </form>
                            </Typography>
                        </div>
                        <div className={classes.element}>
                            <Typography variant='h5'>
                                <form className={classes.root} noValidate autoComplete='off'>
                                    <TextField id='standard-basic' label='Avatar URL' />
                                </form>
                            </Typography>
                        </div>
                        <Button variant='contained' color='primary' className={classes.button}>Submit</Button>
                    </div>
                </Fade>
            </Modal>




        </div>
    );
}

export default EditProfile;
