import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Loader from 'react-loader-spinner'

import Title from "./../Title";
import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import { Queue } from "./../Queue";
import { Request } from "./Request";

import { QueueContext } from "../../../context/Queue/QueueState";
import { AuthContext } from "../../../context/Auth/AuthState";

import { useStyles } from "./Styles/SessionStyles";

export default function StudentsSession() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const {
    members,
    isLoading
  } = useContext(QueueContext);
  const alert = useAlert();

  const queueMembers = members.filter(member => member.status == 'inline')
  const otherMembers = members.filter(member => member.status != 'inline')
  const queueUser = members.find((element) => { return element._id === user._id })

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "student") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
      }
    });
  }, []);

  if (isLoading == true) {
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
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={classes.request}>
                <Request user={queueUser} />
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
                <Title>Members: </Title>
                <Queue members={otherMembers} />
              </Paper>
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
