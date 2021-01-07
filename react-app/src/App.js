import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  fetchClassrooms,
  setUserClasses,
  setCurrentClassRoom,
} from "../src/store/users";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import Navigation from "./components/NavBar/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import InstructorClassrooms from "./components/classrooms/InstructorClassrooms";
import StudentClassrooms from "./components/classrooms/StudentClassrooms";
import Footer from "./components/footer/Footer";
import EditProfile from "./components/edit_profile/EditProfile";
import InstructorLayout from "./components/InstructorClassroomDashboard/InstructorClassroomLayout";
import StudentLayout from "./components/StudentClassroomDashboard/StudentClassroomLayout";
import MainLayout from "./MainLayout";
import AskQuestion from "./components/ask-a-question/AskQuestion";
import { Grid } from "@material-ui/core";

const siteTitle = "ClassCorral";

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const currentClassroom = useSelector((state) => state.store.current_class);
  const currentClassrooms = useSelector((state) => state.store.classrooms);
  const currentUser = useSelector((state) => state.store.current_user);

  //   const interval = (id) => {
  //     setInterval(async function () {
  //       const classrooms = await fetchClassrooms(id);
  //       dispatch(setUserClasses(classrooms));
  //     }, 10000);
  //   };

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      // console.log("user: ", user);
      setLoaded(true);
      dispatch(setCurrentUser(user));
      // setUserRole(user.role)
      //   interval(user.id)
      const classrooms = await fetchClassrooms(user.id);
      dispatch(setUserClasses(classrooms));
    })();
  }, [authenticated]);

  useEffect(() => {
    (async () => {
      if (socket) {
        console.log("socket:");
        console.log(socket);
      }
    })();
  }, []);

  useEffect(() => {
    if (!currentClassroom) return;
    console.log("currentClassroom");
    console.log(currentClassroom);
    socket.emit("join", currentClassroom.id);
  }, [currentClassroom]);

  socket.on("question", async () => {
    console.log("INSIDE SOCKET.ON");
    console.log(socket);
    console.log("currentUser: ");
    console.log(currentUser);
    console.log("currentUser.id: ");
    console.log(currentUser.id);
    const classrooms = await fetchClassrooms(currentUser.id);
    dispatch(setUserClasses(classrooms));
  });

  if (!currentUser) return null;
  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path="/login" exact={true}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          className="login__container-height"
        >
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Grid>
      </Route>
      <Route path="/signup" exact={true}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          className="login__container-height"
        >
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Grid>
      </Route>

      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />
        <div className="negative-space"></div>
        {/* <Grid container justify="space-around" className="outlined"> */}
        {currentUser.role === "instructor" ? (
          currentClassroom ? (
            <InstructorLayout />
          ) : (
            <InstructorClassrooms />
          )
        ) : currentClassroom ? (
          <StudentLayout />
        ) : (
          <>
            <StudentClassrooms />
          </>
        )}
        {/* </Grid> */}

        <div className="negative-space"></div>
        <Footer />
      </ProtectedRoute>
      <Route path="/question" exact={true} authenticated={authenticated}>
        {/* <AskQuestion socket={socket} /> */}
      </Route>
    </BrowserRouter>
  );
};

export default App;
