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

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <ProtectedRoute authenticated={authenticated}>
        <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />
      </ProtectedRoute>
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
      {/* remove 'test' route below after finishing modal */}
      <Route path='/testing' exact={true}>
        <EditProfile />
        <Footer />
      </Route>
      <Route path="/test" exact={true}>
        <EditProfile />
      </Route>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        {/* <InstructorClassrooms /> */}
        {/* <StudentClassrooms /> */}
        {/* <div className="outlined">My Home Page</div> */}
        <User />
      </ProtectedRoute>


      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Box className='appContainer'>
          <Navigation setAuthenticated={setAuthenticated} title={siteTitle} />

          {currentClassroom ? <InstructorLayout /> : <button onClick={() => dispatch(setCurrentClassRoom(1))} >Set Class 1</button>}

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
