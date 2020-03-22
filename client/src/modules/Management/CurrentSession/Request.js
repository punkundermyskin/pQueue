import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import SocketContext from './../../../context/SocketContext/context'

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
  mainField: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center"
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //     marginTop: theme.spacing(6),
    //     marginBottom: theme.spacing(6),
    //     padding: theme.spacing(3)
    // }
  }
}));

export function Request() {
  const classes = useStyles();
  const { queueLength } = useContext(SocketContext);

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        John Wick {queueLength}
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        Main Service
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        %Whatever%
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        {/* <Paper > */}
        <Button variant="contained" color="primary" >
          Call Next
        </Button>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
}
