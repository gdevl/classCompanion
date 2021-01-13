import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  //   fetchClassrooms,
  //   setUserClasses,
} from "../src/store/current_user";
import { getUserClassrooms, fetchClassDisplay } from "../src/store/classrooms";
import { fetchClassroomDetails } from "../src/store/current_classroom";
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
import AllClassrooms from "./components/classrooms/AllClassrooms";
import SingleClassroom from "./components/classrooms/SingleClassroom";
import Landing from "./Landing";
import Splash from "./Splash";

const siteTitle = "Class Companion";

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const currentClassroomId = useSelector((state) => state.currentClassroomId);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
      dispatch(setCurrentUser(user));
      const classrooms = await fetchClassDisplay(user.id);
      dispatch(getUserClassrooms(classrooms));
    })();
  }, [authenticated]);

  useEffect(() => {
    if (!currentClassroomId) return;
    console.log("currentClassroom");
    console.log(currentClassroomId);

    socket.emit("leave", currentClassroomId);
    socket.emit("join", currentClassroomId);
  }, [currentClassroomId]);

  useEffect(() => {
    socket.on("response", async () => {
      if (currentUser) {
        const classrooms = await fetchClassDisplay(currentUser.id);
        dispatch(getUserClassrooms(classrooms));
      }
    });
  });

  if (!currentUser) {
    return null;
  }
  if (!loaded) {
    return null;
  }
  console.log("currentClassroom:");
  console.log(currentClassroomId);
  return (
    <BrowserRouter>
        <Route exact path="/landing">
           <Splash />
      </Route>
      <Route exact path="/login">
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/signup">
        <SignUpForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/jerry">
          <h1>Hello Jerry</h1>
      </Route>

      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />
        <div className="negative-space"></div>
        {currentClassroomId ? <SingleClassroom /> : <AllClassrooms />}
        <div className="negative-space"></div>
        <Footer />
      </ProtectedRoute>
    </BrowserRouter>
  );
};

export default App;
