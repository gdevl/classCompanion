import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Modal, TextField, ClickAwayListener } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
import EditProfile from '../edit_profile/EditProfile';

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
  },
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
    marginBottom: '1rem'
  },
  menuButton: {
    border: 'none',
    fontFamily: 'Roboto',
    fontSize: '16px',
    marginLeft: '-6px',
    backgroundColor: 'white',
    "&:hover": {
      backgroundColor: '#f5f5f5'
    },
    margin: theme.spacing(1),
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
    left: '8.5rem',
    border: 'none',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  backBtn: {
    backgroundColor: 'white',
    "&:active": {
      backgroundColor: 'white'
    },
    "&:hover": {
      backgroundColor: 'white'
    }
  },
  avatar: {
    marginBottom: '1rem',
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Navigation = ({ setAuthenticated }) => {

  // let userObj = { hola: 1 }

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);

  //   const handleChange = (event) => {
  //     setAuth(event.target.checked);
  //   };

  //grab current user from store (imported section from EditProfile component)
  const currentUser = useSelector((state) => state.store)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");


  if (!currentUser.current_user) return null;
  const id = currentUser.current_user.id;




  // (() => {
  //   setEmail(currentUser.current_user.email)
  //   setUsername(currentUser.current_user.username)
  //   setAvatarUrl(currentUser.current_user.avatar_url)

  // })()

  const updateProfile = async () => {
    const response = await fetch(`/api/users/${id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, avatarUrl }),
    });
    if (response.ok) {
      window.location.reload()
    }
  };

  // const collectUserDataForEdit = async () => {
  //   const response = await fetch(`/api/users/${id}/update`, {
  //     method: "GET"
  //   });
  //   const users = await response.json()
  //   // console.log('hola')
  //   userObj.username = users.username
  //   userObj.email = users.email
  //   userObj.avatar_url = users.avatar_url

  //   if (response.ok) {
  //     window.location.reload()
  //   }
  // };

  // collectUserDataForEdit()
  // console.log('look here: ', userObj)


  const handleOpenModal = () => {
    setEmail(currentUser.current_user.email)
    setUsername(currentUser.current_user.username)
    setAvatarUrl(currentUser.current_user.avatar_url)
    setOpen(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation()
    // console.log(e.target)
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
    setAuthenticated(false);
  };

  return (
    <div className={classes.navigation}>
      <AppBar position="static">
        <Toolbar>
          <Button size='large' variant='contained' onClick={() => { window.location.reload() }} className={classes.backBtn} variant='outlined'>Classes</Button>
          <Typography variant="h6" className={classes.title} align="center">
            User
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                      <Typography variant='h5'>
                        <form className={classes.paper} noValidate autoComplete='off' onSubmit={updateProfile}>
                          {/* <form className={classes.paper} noValidate autoComplete='off'> */}
                          <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                          {/* <Button size='large' variant='contained' onClick={() => handleCloseModal()} className={classes.exitBtn}>x</Button> */}
                          <Avatar alt="" src={avatarUrl} className={classes.avatar} size='large'></Avatar>
                          <Typography variant='h4' className={classes.editHeading}>
                            Edit Profile
                            </Typography>
                          <TextField id='standard-basic' value={username} onChange={updateUsername} label='Username' autoFocus />
                          <TextField id='standard-basic' value={email} onChange={updateEmail} label='Email' />
                          {/* <TextField id='standard-basic' value={password} onChange={updatePassword} label='Password' /> */}
                          <TextField id='standard-basic' value={avatarUrl} onChange={updateAvatarUrl} label='Avatar URL' />
                          <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                      </Typography>
                    </Fade>
                  </Modal>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
