import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { AuthContext } from "../../context/Auth/AuthState";
import { SessionsContext } from "../../context/Sessions/SessionsState";
import { UsersContext } from "../../context/Users/UsersState";

import { NavBar } from "../Basic/NavBar";
import { Copyright } from "../Basic/Copyright";
import { CreateSession } from "./CreateSession";
import { VirtualizedList } from "./VirtualizedList";
import { Session } from "./Session"

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
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
        getOperators()
      }
    });
  }, [isAuth]);
  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs="auto" md={5} lg={5}>
              <Paper className={classes.paper}>
                {(isHidden) ?
                  <Button
                    variant="contained"
                    color="primary"
                    // fullWidth
                    onClick={() => setHidden(!isHidden)}
                  >
                    Create New Session
              </Button> :

                  <CreateSession operators={users} />}

              </Paper>
            </Grid>
          </Grid>
          {/* <Grid item xs="auto" md={7} lg={7}> */}
          {/* <Paper className={classes.paper}> */}
          <Table>
            <Thead>
              <Tr>
                <Th>Event</Th>
                <Th>Date</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Tablescon</Td>
                <Td>9 April 2019</Td>
                <Td>East Annex</Td>
              </Tr>
              <Tr>
                <Td>Capstone Data</Td>
                <Td>19 May 2019</Td>
                <Td>205 Gorgas</Td>
              </Tr>
              <Tr>
                <Td>Tuscaloosa D3</Td>
                <Td>29 June 2019</Td>
                <Td>Github</Td>
              </Tr>
            </Tbody>
          </Table>
          {/* {sessions.map(session => (<Session key={session._id} session={session} />))} */}
          {/* </Paper> */}
          {/* </Grid> */}
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
