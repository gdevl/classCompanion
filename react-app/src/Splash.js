import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import LoginForm from "./components/auth/LoginForm/LoginForm.js";


function Copyright() {
  return (
    <Typography variant="body2" className="footer__text" align="center">
      {"Copyright © "}
      <Link className="footer__copyright-link" color="inherit" href="https://github.com/gdevl/classCorral.git">
        Class Companion
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
    // paddingTop: "100%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Splash = () => {
  const history = useHistory();
  const classes = useStyles();
  const handleGitHubClick = () => {
    window.location.href = "https://github.com/gdevl/classCorral.git";
  };

    const handleClick = () => {
        history.push('/login');
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
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <h1 className="splash__hero-title"
              >
                Class Companion
              </h1>
              <h5 className="splash__hero-subtitle" >
                Virtual classroom management... simplified.
              </h5>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                      Get Started
                    </Button>
                  </Grid>
                  {/* <Grid item>
                      <Button variant="outlined" color="primary">
                      Secondary action
                      </Button>
                      </Grid> */}
                </Grid>
              </div>
            </Container>
          </div>
          {/* <Container className={classes.cardGrid} maxWidth="md"> */}
            {/* End hero unit */}
            <div className="splash__callout-features">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <EmojiPeopleIcon className="splash__callout-featured-icon" />
                      <Typography className="splash__callout-boxes" gutterBottom variant="h5" component="h2">
                        Take Attendance
                      </Typography>
                      <Typography className="splash__callout-boxes">With dynamic daily check-ins</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <QuestionAnswerIcon className="splash__callout-featured-icon" />
                      <Typography className="splash__callout-boxes" gutterBottom variant="h5" component="h2">
                        Take Questions
                      </Typography>
                      <Typography className="splash__callout-boxes">And answer them in real-time</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <GroupWorkIcon className="splash__callout-featured-icon" />
                      <Typography className="splash__callout-boxes" gutterBottom variant="h5" component="h2">
                        Take Control
                      </Typography>
                      <Typography className="splash__callout-boxes">With flexible group creation</Typography>
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
            <a href="https://www.linkedin.com/in/gabriel-lane-4120651bb/">Ranson Knorr</a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/gabriel-lane-4120651bb/">Gabriel Lane</a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/gabriel-lane-4120651bb/">Ryan Matuszak</a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/gabriel-lane-4120651bb/">Warren Tamagri</a>
          </div>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
  );
};

export default Splash;
