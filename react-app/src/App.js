import React, { createContext, useContext, useState, useEffect } from 'react';
import { SocketContext } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../src/store/current_user';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import Navigation from './components/navbar/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './services/auth';
import Footer from './components/footer/Footer';
import AllClassrooms from './components/classrooms/AllClassrooms';
import SingleClassroom from './components/classrooms/SingleClassroom';
import Splash from './Splash';

const siteTitle = 'Class Companion';

export const UserContext = createContext();

const App = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
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
        })();
    }, [authenticated]);

    useEffect(() => {
        if (!currentClassroomId) return;
        socket.emit('leave', currentClassroomId);
        socket.emit('join', currentClassroomId);
    }, [currentClassroomId]);

    return (
        <BrowserRouter>
            <Route exact path="/landing">
                <Splash
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
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
                {loaded && currentUser.id ? (
                    <UserContext.Provider value={currentUser}>
                        <Navigation
                            setAuthenticated={setAuthenticated}
                            title={siteTitle}
                        />
                        <div className="negative-space"></div>
                        {currentClassroomId ? (
                            <SingleClassroom classroomId={currentClassroomId} />
                        ) : (
                            <AllClassrooms />
                        )}
                        <div className="negative-space"></div>
                        <Footer />
                    </UserContext.Provider>
                ) : (
                    <p>Loading... </p>
                )}
            </ProtectedRoute>
        </BrowserRouter>
    );
};

export default App;
