import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import LoginDialog from './components/auth/LoginDialog';
import SignUpDialog from './components/auth/SignUpDialog';

function Copyright() {
    return (
        <Typography variant="body2" className="footer__text" align="center">
            {'Copyright © '}
            <Link
                className="footer__copyright-link"
                color="inherit"
                href="https://github.com/gdevl/classCompanion"
            >
                Class Companion
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const Splash = ({ authenticated, setAuthenticated }) => {
    const [open, setOpen] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const classes = useStyles();
    const handleGitHubClick = () => {
        window.location.href = 'https://github.com/gdevl/classCorral.git';
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography
                        className="splash__topbar-title"
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        Class Companion
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className="splash__main">
                {/* Hero unit */}
                <LoginDialog
                    open={open}
                    setOpen={setOpen}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
                <SignUpDialog
                    showSignUp={showSignUp}
                    setShowSignUp={setShowSignUp}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <h1 className="splash__hero-title">Class Companion</h1>
                        <h5 className="splash__hero-subtitle">
                            Virtual classroom management... simplified.
                        </h5>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                    >
                                        Log In
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setShowSignUp(true)}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {/* End hero unit */}
                <div className="splash__callout-features">
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <EmojiPeopleIcon className="splash__callout-featured-icon" />
                                    <Typography
                                        className="splash__callout-boxes"
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Take Attendance
                                    </Typography>
                                    <Typography className="splash__callout-boxes">
                                        With dynamic daily check-ins
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <QuestionAnswerIcon className="splash__callout-featured-icon" />
                                    <Typography
                                        className="splash__callout-boxes"
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Take Questions
                                    </Typography>
                                    <Typography className="splash__callout-boxes">
                                        And answer them in real-time
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <GroupWorkIcon className="splash__callout-featured-icon" />
                                    <Typography
                                        className="splash__callout-boxes"
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Take Control
                                    </Typography>
                                    <Typography className="splash__callout-boxes">
                                        With flexible group creation
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                {/* </Container> */}
            </main>
            {/* Footer */}
            <div className="splash__footer-negative-space"></div>
            <footer className="splash__footer">
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <IconButton onClick={handleGitHubClick}>
                            <GitHubIcon className="footer__icon" />
                        </IconButton>
                    </Grid>
                </Grid>
                <div className="footer__devs">
                    <a href="https://www.linkedin.com/in/ranson-knorr-b132391b7/">
                        Ranson Knorr
                    </a>
                    <a href="https://www.linkedin.com/in/gabriel-lane-4120651bb/">
                        Gabriel Lane
                    </a>
                    <a href="https://www.linkedin.com/in/ryan-matuszak-962440147/">
                        Ryan Matuszak
                    </a>
                    <a href="https://www.linkedin.com/in/warren-tamagri-5648a71ba/">
                        Warren Tamagri
                    </a>
                </div>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
};

export default Splash;
