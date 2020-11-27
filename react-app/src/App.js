import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import { useDispatch } from "react-redux";
import { setCurrentUser, fetchClassrooms, setUserClasses } from "../src/store/users";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import Navigation from "./components/NavBar/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
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

      {/* <ProtectedRoute authenticated={authenticated}>
        <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />
      </ProtectedRoute> */}

      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute
        path="/users/:userId"
        exact={true}
        authenticated={authenticated}
      >
        <User />
      </ProtectedRoute>

      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Box className='appConainer'>
          <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />
          <InstructorLayout />
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
