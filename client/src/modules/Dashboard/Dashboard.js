import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { NavBar } from "../Basic/NavBar";
import NextRequest from "./NextRequest";
import VirtualizedList from "./VirtualizedList";

import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

import { useStyles } from "../Basic/mainStyles";
import { Copyright } from "./../Basic/Copyright";

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // const { isAuth } = useContext(GlobalContext);
  // const history = useHistory();
  // const { loadUser } = useContext(GlobalContext);

  // useEffect(() => {
  //   loadUser().then(() => {
  //     if (!isAuth) {
  //       history.push('/login')
  //     }
  //   });
  // }, [isAuth]);

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
              </Paper>
            </Grid>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
              </Paper>
            </Grid>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
              </Paper>
            </Grid>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
              </Paper>
            </Grid>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
              </Paper>
            </Grid>
            <Grid item xs="auto" md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <NextRequest />
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
