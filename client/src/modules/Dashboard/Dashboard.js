import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Navbar } from "../Basic/Navbar";
import { SessionCard } from "./SessionCard";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth/AuthState";
import { SessionsContext } from "../../context/Sessions/SessionsState";

import { useStyles } from "../Basic/mainStyles";
import { Copyright } from "./../Basic/Copyright";

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { getSessions, sessions, sessionsSuccess, sessionsError } = useContext(SessionsContext)

  useEffect(() => {
    getSessions()
  }, []);


  // const { isAuth } = useContext(AuthContext);
  // const history = useHistory();
  // const { loadUser } = useContext(AuthContext);

  // useEffect(() => {
  //   loadUser().then(() => {
  //     if (!isAuth) {
  //       history.push('/login')
  //     }
  //   });
  // }, [isAuth]);

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {sessions.map(session => (
              <Grid item xs="auto" md={3} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <SessionCard key={session._id} session={session} />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
