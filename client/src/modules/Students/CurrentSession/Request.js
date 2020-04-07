import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import moment from 'moment'

import { AuthContext } from "../../../context/Auth/AuthState";
import { QueueContext } from "../../../context/Queue/QueueState";

const emails = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  mainField: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center"
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //     marginTop: theme.spacing(6),
    //     marginBottom: theme.spacing(6),
    //     padding: theme.spacing(3)
    // }
  },
  title: {
    marginBottom: theme.spacing(3),
    color: 'white '
  }
}));

export function Request() {
  const classes = useStyles();
  const history = useHistory();
  const {
    members,
    session,
    getQueueInfo,
    joinLine,
    leaveSession
  } = useContext(QueueContext);
  const { user } = useContext(AuthContext);

  // var sessionID = null;
  // if (user == null) {
  //   history.push("/login");
  // } else {
  //   sessionID = user.session;
  // }

  const currentDate = moment();
  const future = moment(session.end);
  const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss");

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div className={classes.root} >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography component="h2" variant="h6" className={classes.title} gutterBottom >
            Current Request
    </Typography>
        </Grid>
        <Grid item>
          <Typography component="h2" variant="h6" className={classes.title} gutterBottom >
            {/* {moment(session.end).fromNow()} */}
            {/* {moment().format('MMMM Do YYYY, h:mm:ss a')} */}
            {timeLeft}
            {/* {moment(dt)} */}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          John
      </Typography>
        <Typography variant="h5" gutterBottom>
          Wick
      </Typography>
        <Grid item xs="auto" md={6} lg={6}>
          Main Service
      </Grid>
        {/* <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        %Whatever%
      </Grid> */}
        <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
          {/* <Grid
            container
            spacing={3}
            direction="row"
            justify="space-around"
            alignItems="center"
          > */}
          <Button
            variant="contained"
            color="primary"
            // className={classes.mainField}
            onClick={() => {
              joinLine(session._id);
            }}
          >
            Get In Line
            </Button>
          <Button
            variant="contained"
            color="primary"
            // className={classes.mainField}
            onClick={() => {
              leaveSession(session._id);
              history.push("/students");
            }}
          >
            Leave Session
            </Button>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
