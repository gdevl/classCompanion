import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  fetchClassrooms,
  setUserClasses,
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
import InstructorLayout from "./components/InstructorClassroomDashboard/InstructorClassroomLayout";
import StudentLayout from "./components/StudentClassroomDashboard/StudentClassroomLayout";
import { Grid } from "@material-ui/core";

const siteTitle = "ClassCorral";

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const currentClassroom = useSelector((state) => state.store.current_class);
  const currentUser = useSelector((state) => state.store.current_user);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
      dispatch(setCurrentUser(user));
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
        {currentUser.role === "instructor" ? (
          currentClassroom ? (
            <InstructorLayout socket={socket} />
          ) : (
            <InstructorClassrooms socket={socket} />
          )
        ) : currentClassroom ? (
          <StudentLayout socket={socket} />
        ) : (
          <>
            <StudentClassrooms socket={socket} />
          </>
        )}

        <div className="negative-space"></div>
        <Footer />
      </ProtectedRoute>
    </BrowserRouter>
  );
};

export default App;
