import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Navbar } from "../../Basic/Navbar";
import { Copyright } from "../../Basic/Copyright";
import { CreateSession } from "./CreateSession";
import ActiveSessionsTable from "./../ActiveSessionsTable";

import { AuthContext } from "./../../../context/Auth/AuthState";
import { SessionsContext } from "./../../../context/Sessions/SessionsState";
import { UsersContext } from "./../../../context/Users/UsersState";

import { useStyles } from "./Styles";

export default function Operator() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { getSessions } = useContext(SessionsContext);
  const { getOperators, users } = useContext(UsersContext);
  const alert = useAlert();
  var [isHidden, setHidden] = useState(true);

  useEffect(() => {
    loadUser().then(() => {
      if (!isAuth) {
        history.push("/login");
      } else if (user.role !== "operator") {
        alert.show("Not authorized to access this resource!");
        history.push("/dashboard");
      } else {
        getSessions();
        getOperators();
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
          <Grid container spacing={3}>
            {isHidden ? (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className={classes.paperButton}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setHidden(!isHidden)}
                >
                  New Session
                </Button>
                <ActiveSessionsTable />
              </Grid>
            ) : (
                <Grid item xs="auto" md={4} lg={4}>
                  <Paper className={classes.paper}>
                    <CreateSession operators={users} />
                  </Paper>
                </Grid>
              )}
            {isHidden ? null : (
              <Grid item xs={12} md={8} lg={8} className={classes.paper}>
                <ActiveSessionsTable />
              </Grid>
            )}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
