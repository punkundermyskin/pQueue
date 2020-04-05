import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { AuthContext } from "../../context/Auth/AuthState";
import { SessionsContext } from "../../context/Sessions/SessionsState";
import { UsersContext } from "../../context/Users/UsersState";

import { Navbar } from "../Basic/Navbar";
import { Copyright } from "../Basic/Copyright";
import { CreateSession } from "./CreateSession";
import ActiveSessionsTable from './ActiveSessionsTable'

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
  paperButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    // padding: theme.spacing(2),
    alignItems: "center",
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3)
    // }
  },
  table: {
    minWidth: 650,
  },
}));

export default function Management() {
  const classes = useStyles();
  const history = useHistory();
  const { loadUser, user, isAuth } = useContext(AuthContext);
  const { sessions, getSessions } = useContext(SessionsContext);
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
        console.log(sessions)
        getOperators()
      }
    });
  }, [isAuth]);
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {(isHidden) ?
              (<Grid item xs={12} md={12} lg={12} className={classes.paperButton}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setHidden(!isHidden)}
                >New Session</Button>
                <ActiveSessionsTable />
              </Grid>) :
              (<Grid item xs="auto" md={4} lg={4}>
                <Paper className={classes.paper}>
                  <CreateSession operators={users} />
                </Paper>
              </Grid>
              )}
            {(isHidden) ? null :
              (<Grid item xs={12} md={8} lg={8} className={classes.paper}>
                {/* <Paper className={classes.paper}> */}
                <ActiveSessionsTable />
                {/* </Paper> */}
              </Grid>)}

          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
