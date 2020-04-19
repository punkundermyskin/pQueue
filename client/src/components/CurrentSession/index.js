import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Loader from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";

import Title from "./Title";
import { Navbar } from "../Basic/Navbar";
import { Copyright } from "../Basic/Copyright";
import { Queue } from "./Lists/Queue";
import { Members } from "./Lists/Members";
import { WaitingRoom } from "./Lists/WaitingRoom";

import { Request } from "./Status/Request";
import { Unready } from "./Status/Unready";
import { Free } from "./Status/Operator/Free";
import { Busy } from "./Status/Operator/Busy";

import { Inline } from './Status/Student/Inline'
import { Processing } from './Status/Student/Processing'
import { Done } from './Status/Student/Done'

import { ProcessingRequest } from './ProcessingRequest';

import { AuthContext } from "../../context/Auth/AuthState";
import { QueueContext } from "../../context/Queue/QueueState";

import { useStyles } from './Styles/SessionStyles';

export default function CurrentSession() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { members, isLoading, setSpinner, sessionsError } = useContext(
    QueueContext
  );
  const alert = useAlert();

  const socketUser = members.find((element) => { return element._id === user._id })

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      }

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sessionsError !== null) {
      const message = sessionsError.substring(0, sessionsError.length - 13);
      alert.show(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionsError]);

  if (isLoading === true, !socketUser) {

    return (
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "50vh" }}
            >
              <Grid item xs={3}>
                <Loader type="None" color="#somecolor" height={80} width={80} />
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  } else {

    const queue = members.filter((member) => member.status === "inline");
    const checkedMembers = members.filter(
      (member) => member.status !== "inline" && member.status !== "request"
    );
    const waitingMembers = members.filter(
      (member) => member.status === "request"
    );
    const processingStudents = members.filter(
      (member) => member.status === "processing"
    );
    const busyOperators = members.filter((member) => member.status === "busy");

    var otherProcessingPairs = []
    var myProcessingPair = null
    for (var i = 0; i < processingStudents.length; i++) {
      const student = processingStudents[i];
      for (var j = 0; j < busyOperators.length; j++) {
        const operator = busyOperators[j];
        if (student.host === operator._id) {
          var pair = { 'student': student, 'operator': operator }
          if (operator._id === socketUser._id || student._id === socketUser._id) {
            myProcessingPair = pair
          } else {
            otherProcessingPairs.push(pair);
          }
        }
      }
    }
    return (
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <LoadingOverlay
            active={setSpinner}
            spinner
            text="Loading your content..."
          >
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  {(user.role === 'operator') ? (
                    <div>
                      {(socketUser.status === 'request') ? (<Request user={socketUser} />) : (null)}
                      {(socketUser.status === 'unready') ? (<Unready user={socketUser} />) : (null)}
                      {(socketUser.status === 'free') ? (<Free user={socketUser} />) : (null)}
                      {(socketUser.status === 'busy') ? (<Busy pair={myProcessingPair} />) : (null)}
                    </div>
                  ) : (
                      <div>
                        {(socketUser.status === 'request') ? (<Request user={socketUser} />) : (null)}
                        {(socketUser.status === 'unready') ? (<Unready user={socketUser} />) : (null)}
                        {(socketUser.status === 'inline') ? (<Inline user={socketUser} queue={queue} />) : (null)}
                        {(socketUser.status === 'processing') ? (<Processing pair={myProcessingPair} />) : (null)}
                        {(socketUser.status === 'done') ? (<Done user={socketUser} />) : (null)}
                      </div>
                    )}
                  {otherProcessingPairs.map(pair => {
                    return (
                      <Grid item xs={12} md={12} lg={12}>
                        <Paper className={classes.paper}>
                          <ProcessingRequest pair={pair} />
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

                {(user.role === 'operator') ? (
                  <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                      <Title>Line:</Title>
                      <Queue queue={queue} />
                    </Paper>
                  </Grid>
                ) : (
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Title>Line:</Title>
                        <Queue queue={queue} />
                      </Paper>
                    </Grid>
                  )}
                {(user.role === 'operator') ? (
                  <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                      <Title>Members: </Title>
                      <Members members={checkedMembers} />
                    </Paper>
                  </Grid>
                ) : (
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Title>Members: </Title>
                        <Members members={checkedMembers} />
                      </Paper>
                    </Grid>
                  )}
                {(user.role === 'operator') ? (
                  <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                      <Title>Waiting Room: </Title>
                      <WaitingRoom members={waitingMembers} />
                    </Paper>
                  </Grid>
                ) : (null)}
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </LoadingOverlay>
        </main>
      </div>
    );
  }
}
