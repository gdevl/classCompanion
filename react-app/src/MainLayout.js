import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, fetchClassrooms, setUserClasses, setCurrentClassRoom } from "../src/store/users";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import Navigation from "./components/NavBar/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import InstructorClassrooms from "./components/classrooms/InstructorClassrooms";
import StudentClassrooms from "./components/classrooms/StudentClassrooms";
import Footer from './components/footer/Footer'
import EditProfile from "./components/edit_profile/EditProfile";
import InstructorLayout from './components/InstructorClassroomDashboard/InstructorClassroomLayout'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    studentContainer: {
        border: '5px solid black'
    }
}));

function MainLayout(props) {
    const currentClassroom = useSelector(state => state.store.current_class)
    const currentUserRole = useSelector(state => state.store.current_user)
    const classes = useStyles();


    return (


        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {currentUserRole.role === 'instructor'
                        ? (currentClassroom ? <InstructorLayout /> : <InstructorClassrooms />)
                        : (currentClassroom ? <InstructorLayout /> : <StudentClassrooms />)
                    }
                    {/* {currentUserRole.role === 'instructor'
                        ? (currentClassroom ? <InstructorLayout /> : <InstructorClassrooms />)
                        : (currentClassroom ? <StudentClassrooms /> : <h1>No Classes Added</h1>)
                    } */}
                </Grid>
                {/* <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid> */}
            </Grid>
        </div>
    );
}

export default MainLayout;
