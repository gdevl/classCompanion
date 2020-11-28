import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
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


const siteTitle = "ClassCorral";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      // console.log("user: ", user);
      setLoaded(true);
      dispatch(setCurrentUser(user));
      const classrooms = await fetchClassrooms(user.id);
      dispatch(setUserClasses(classrooms))
    })();
  }, [authenticated]);

  const currentClassroom = useSelector(state => state.store.current_class)
  const currentUserRole = useSelector(state => state.store.current_user)

  if(!currentUserRole) return null
  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>

      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/signup" exact={true}>
        <SignUpForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Box className='appContainer'>
          <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />

          {currentUserRole.role === 'instructor'
          ? ( currentClassroom ? <InstructorLayout /> : <InstructorClassrooms /> )
          : ( currentClassroom ? <InstructorLayout /> : <StudentClassrooms /> )
          }

          <Footer />
        </Box>
      </ProtectedRoute>

      {/* <ProtectedRoute authenticated={authenticated}>
        <Footer setAuthenticated={setAuthenticated} />
      </ProtectedRoute> */}

    </BrowserRouter>

  );
}

export default App;
