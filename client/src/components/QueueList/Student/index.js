import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import ActiveSessionsTable from "./../ActiveSessionsTable";

import { AuthContext } from "../../../context/Auth/AuthState";
import { SessionsContext } from "../../../context/Sessions/SessionsState";

import { useStyles } from "./Styles";

export default function Student() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { getSessions } = useContext(SessionsContext);
  const alert = useAlert();

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "student") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
      } else {
        getSessions();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12} md={8} lg={8} className={classes.paper}>
            <ActiveSessionsTable />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
