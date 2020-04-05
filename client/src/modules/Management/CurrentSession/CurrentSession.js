import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Title from './Title';
import RequestTitle from './RequestTitle';

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { AuthContext } from "../../../context/Auth/AuthState";
import { SessionsContext } from "../../../context/Sessions/SessionsState";
import { UsersContext } from "../../../context/Users/UsersState";

import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import { CreateSession } from "./../CreateSession";
import ActiveSessionsTable from "./../ActiveSessionsTable";
import { Queue } from "./Queue";
import { Request } from "./Request";

import { QueueContext } from "./../../../context/Queue/QueueState";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
  request: {
    background: 'linear-gradient(45deg, #FE6B8B 10%, #4153AF 90%)',
    color: 'white',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },
    requestTitle: {
      color: 'white'
    }
  }
}));

export default function CurrentSession() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { students, getStudents } = useContext(SessionsContext);
  const {
    members,
    session,
    getQueueInfo,
    joinSocketSession,
    leaveSession
  } = useContext(QueueContext);
  //   const { getOperators, users } = useContext(UsersContext);
  const alert = useAlert();

  const queueMembers = members.filter(member => member.status == 'inline')
  const otherMembers = members.filter(member => member.status != 'inline');

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "operator") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
      }
    });
  }, [isAuth]);

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={classes.request}>
                <Request />
              </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Paper className={classes.paper}>
                <Title>Line:</Title>
                <Queue members={queueMembers} />
              </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Paper className={classes.paper}>
                <Title>Members:</Title>
                <Queue members={otherMembers} />
              </Paper>
            </Grid>
            {/* <Grid item xs={6} md={3} lg={3}>
              <Paper className={classes.paper}>
                <WaitingList />
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
