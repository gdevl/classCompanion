import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Modal, TextField } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LogoutButton from "../auth/LogoutButton";
import { logout } from "../../services/auth";
import FaceIcon from "@material-ui/icons/Face";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { clearCurrentClassroom } from "../../store/current_classroom";
import { clearClassroomMeta } from "../../store/classroom_meta";
import { clearClassrooms } from "../../store/classrooms";
import { clearCurrentUser } from "../../store/current_user";
import { clearClassGroups } from "../../store/groups";
import { setGroupsDefined } from "../../store/define_groups";

const useStyles = makeStyles((theme) => ({
    navigation: {
        flexGrow: 1,
        width: "100%",
    },
    //   menuButton: {
    //     marginRight: theme.spacing(2),
    //   },
    title: {
        flexGrow: 1,
        fontFamily: "Prompt",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "white",
        outline: "0",
        border: "2px solid white",
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        paddingLeft: "5rem",
        paddingRight: "5rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    editHeading: {
        marginBottom: "1rem",
    },
    menuButton: {
        border: "none",
        fontFamily: "Roboto",
        fontSize: "16px",
        marginLeft: "-6px",
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
        margin: theme.spacing(1),
    },
    element: {
        padding: "1rem",
    },
    button: {
        marginTop: "2rem",
    },
    btnContainer: {
        position: "relative",
        left: "72%",
        bottom: "100%",
    },
    exitBtn: {
        position: "relative",
        bottom: "1.95rem",
        left: "8.5rem",
        border: "none",
        paddingRight: "0px",
        paddingLeft: "0px",
    },
    backBtn: {
        backgroundColor: "white",
        "&:active": {
            backgroundColor: "white",
        },
        "&:hover": {
            backgroundColor: "white",
        },
    },
    avatar: {
        marginBottom: "1rem",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    root: {
        position: "relative",
    },
    dropdown: {
        position: "absolute",
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: "1px solid",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    medium: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    back: {
        color: "white",
    },
    padMe: {
        marginLeft: "4rem",
    },
}));

const Navigation = ({ setAuthenticated }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const currentClassroomId = useSelector((state) => state.currentClassroomId);
    const classMeta = useSelector((state) => state.currentClassroomMeta);
    const displayTitle = classMeta.name ? classMeta.name : "Class Companion";

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);

    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url);

    if (!currentUser) return null;
    const id = currentUser.id;

    const updateProfile = async () => {
        const response = await fetch(`/api/users/${id}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, avatarUrl }),
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    const displayAllClasses = (e) => {
        e.preventDefault();
        dispatch(clearCurrentClassroom());
        dispatch(clearClassroomMeta());
        dispatch(clearClassGroups());
        dispatch(setGroupsDefined(false));
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    // const updatePassword = (e) => {
    //   setPassword(e.target.value);
    // };

    const updateAvatarUrl = (e) => {
        setAvatarUrl(e.target.value);
    };

    //end

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async (e) => {
        await logout();
        dispatch(clearCurrentClassroom());
        dispatch(clearClassrooms());
        dispatch(clearCurrentUser());
        dispatch(clearClassGroups());
        dispatch(clearClassroomMeta());
        dispatch(setGroupsDefined(false));
        setAuthenticated(false);
    };

    return (
        <div className={classes.navigation}>
            <AppBar position="static">
                <Toolbar>
                    {currentClassroomId ? (
                        <IconButton size="medium" onClick={displayAllClasses}>
                            <ArrowBackIcon className={classes.back} />
                        </IconButton>
                    ) : (
                        <div className={classes.padMe}></div>
                    )}
                    <Typography
                        variant="h6"
                        className={classes.title}
                        align="center"
                    >
                        {displayTitle}
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="secondary"
                            >
                                {currentUser.avatar_url ? (
                                    <Avatar
                                        alt=""
                                        src={currentUser.avatar_url}
                                        className={classes.medium}
                                    ></Avatar>
                                ) : (
                                    <FaceIcon />
                                )}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open1}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleOpenModal}>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleCloseModal}
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
                                                    onSubmit={updateProfile}
                                                >
                                                    {/* <form className={classes.paper} noValidate autoComplete='off'> */}
                                                    <Button
                                                        size="large"
                                                        variant="contained"
                                                        onClick={
                                                            handleCloseModal
                                                        }
                                                        className={
                                                            classes.exitBtn
                                                        }
                                                        variant="outlined"
                                                    >
                                                        x
                                                    </Button>
                                                    {/* <Button size='large' variant='contained' onClick={() => handleCloseModal()} className={classes.exitBtn}>x</Button> */}
                                                    <Avatar
                                                        alt=""
                                                        src={avatarUrl}
                                                        className={
                                                            classes.avatar
                                                        }
                                                        size="large"
                                                    ></Avatar>
                                                    <Typography
                                                        variant="h4"
                                                        className={
                                                            classes.editHeading
                                                        }
                                                    >
                                                        Edit Profile
                                                    </Typography>
                                                    <TextField
                                                        id="standard-basic"
                                                        value={username}
                                                        onChange={
                                                            updateUsername
                                                        }
                                                        label="Username"
                                                        autoFocus
                                                    />
                                                    <TextField
                                                        id="standard-basic"
                                                        value={email}
                                                        onChange={updateEmail}
                                                        placeholder={
                                                            currentUser.email
                                                        }
                                                        label="Email"
                                                    />
                                                    {/* <TextField id='standard-basic' value={password} onChange={updatePassword} label='Password' /> */}
                                                    <TextField
                                                        id="standard-basic"
                                                        value={avatarUrl}
                                                        onChange={
                                                            updateAvatarUrl
                                                        }
                                                        label="Avatar URL"
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={
                                                            classes.button
                                                        }
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </form>
                                            </Typography>
                                        </Fade>
                                    </Modal>
                                    Edit Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;
