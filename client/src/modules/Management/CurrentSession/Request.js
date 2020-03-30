import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { AuthContext } from "./../../../context/Auth/AuthState";
import { QueueContext } from "./../../../context/Queue/QueueState";

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
  const history = useHistory();
  const { members, status, getQueueInfo, joinSession } = useContext(
    QueueContext
  );
  const { user } = useContext(AuthContext);

  var sessionID = null;
  if (user == null) {
    history.push("/login");
  } else {
    sessionID = user.session;
  }

  useEffect(() => {
    getQueueInfo("5e68a1c71de6fd875e8d93bb");
    // }
    // // console.log(sessionID)
    // console.log(user.session)
  }, []);

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        John Wick {status}
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        Main Service {members.length}
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        %Whatever%
      </Grid>
      <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
        {/* <Paper > */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            joinSession("5e68a1c71de6fd875e8d93bb");
          }}
        >
          Call Next
        </Button>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
}
