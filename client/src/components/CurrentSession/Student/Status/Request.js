import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Loader from 'react-loader-spinner'
import Paper from "@material-ui/core/Paper";

import { QueueContext } from "../../../../context/Queue/QueueState";
import { useStyles } from "../Styles/StatusStyles";

export function Request({ user }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #7f8282 10%, #4153AF 90%)' });
  const history = useHistory();
  const {
    session,
    joinLine,
    leaveSession
  } = useContext(QueueContext);

  if (user) {
    return (
      <div className={classes.root} >
        <Paper className={classes.status}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography component="h2" variant="h6" className={classes.title} gutterBottom >
                Waiting Room
      </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  leaveSession(session._id);
                  history.push("/student");
                }}
              >
                Leave
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              John
        </Typography>
            <Typography variant="h5" gutterBottom>
              Wick
        </Typography>
            <Grid item xs="auto" md={6} lg={6}>
              Main Service
        </Grid>
            <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
              Ask operator to verify you
          </Grid>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    return (
      <Loader type="None" color="#somecolor" height={80} width={80} />
    )
  }
}
