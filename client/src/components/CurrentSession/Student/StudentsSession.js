import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Loader from 'react-loader-spinner'
import LoadingOverlay from "react-loading-overlay";

import Title from "./../Title";
import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import { Queue } from "./../Queue";
import { Request } from "./Status/Request";
import { Unready } from "./Status/Unready";
import { Inline } from "./Status/Inline";
import { Processing } from "./Status/Processing";
import { Done } from "./Status/Done";

import { QueueContext } from "../../../context/Queue/QueueState";
import { AuthContext } from "../../../context/Auth/AuthState";

import { useStyles } from "./Styles/SessionStyles";

export default function StudentsSession() {

  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const {
    members,
    isLoading,
    setSpinner
  } = useContext(QueueContext);
  const alert = useAlert();

  const queueMembers = members.filter(member => member.status === 'inline')
  const otherMembers = members.filter(member => member.status !== 'inline')
  const queueUser = members.find((element) => { return element._id === user._id })
  const processingStudents = members.filter(
    (member) => member.status === "processing"
  );
  const busyOperators = members.filter((member) => member.status === "busy");

  var processingPairs = []
  var myProcessingPair = null
  for (var i = 0; i < processingStudents.length; i++) {
    const student = processingStudents[i];
    for (var j = 0; j < busyOperators.length; j++) {
      const operator = busyOperators[j];
      if (student.host === operator._id) {
        var pair = { 'student': student, 'operator': operator }
        processingPairs.push(pair);
        if (student._id === queueUser._id) {
          myProcessingPair = pair
        }
      }
    }
  }

  const classes = useStyles();

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "student") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading === true, !queueUser) {
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
              style={{ minHeight: '50vh' }}
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
    )
  } else {
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
              <Grid container>
                <Grid item xs={12} md={6} lg={3}>
                  {/* <Paper className={classes.request}> */}
                  {(queueUser.status === 'request') ? (<Request user={queueUser} />) : (null)}
                  {(queueUser.status === 'unready') ? (<Unready user={queueUser} />) : (null)}
                  {(queueUser.status === 'inline') ? (<Inline user={queueUser} />) : (null)}
                  {(queueUser.status === 'processing') ? (<Processing pair={myProcessingPair} />) : (null)}
                  {(queueUser.status === 'done') ? (<Done user={queueUser} />) : (null)}
                  {/* </Paper> */}
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <Paper className={classes.paper}>
                    <Title>Line:</Title>
                    <Queue members={queueMembers} />
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <Paper className={classes.paper}>
                    <Title>Members: </Title>
                    <Queue members={otherMembers} />
                  </Paper>
                </Grid>
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
