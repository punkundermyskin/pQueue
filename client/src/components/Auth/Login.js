import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { useStyles } from "./stylesAuth";
import { Navbar } from "../Basic/Navbar";
import { Copyright } from "../Basic/Copyright";
import { SignIn } from "./SignIn";

export default function Login() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <SignIn />
          </Paper>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
