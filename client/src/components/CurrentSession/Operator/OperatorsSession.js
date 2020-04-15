import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Loader from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";

import Title from "./../Title";
import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import { Queue } from "./../Queue";
import { WaitingRoom } from "./WaitingRoom";
import { Request } from "./Request";

import { AuthContext } from "../../../context/Auth/AuthState";
import { QueueContext } from "../../../context/Queue/QueueState";

import { useStyles } from "./Styles/SessionStyles";

export default function OperatorsSession() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { members, isLoading, setSpinner, sessionsError } = useContext(
    QueueContext
  );
  const alert = useAlert();

  const queue = members.filter((member) => member.status === "inline");
  const checkedMembers = members.filter(
    (member) => member.status !== "inline" && member.status !== "request"
  );
  const waitingMembers = members.filter(
    (member) => member.status === "request"
  );

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "operator") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
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

  if (isLoading === true) {
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
            <Grid container>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.request}>
                  <Request />
                </Paper>
              </Grid>
              <Grid item xs={4} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Title>Line:</Title>
                  <Queue members={queue} />
                </Paper>
              </Grid>
              <Grid item xs={4} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Title>Members: </Title>
                  <Queue members={checkedMembers} />
                </Paper>
              </Grid>
              <Grid item xs={4} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Title>Waiting Room: </Title>
                  <WaitingRoom members={waitingMembers} />
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
