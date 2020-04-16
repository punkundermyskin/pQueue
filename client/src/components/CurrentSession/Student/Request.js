import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Loader from 'react-loader-spinner'

import { QueueContext } from "../../../context/Queue/QueueState";
import { useStyles } from "./Styles/RequestStyles";

export function Request({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    session,
    joinLine,
    leaveSession
  } = useContext(QueueContext);

  if (user) {
    return (
      <div className={classes.root} >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography component="h2" variant="h6" className={classes.title} gutterBottom >
              Current Request
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
            {(user.status === 'request') ? ('in wait') : (null)}
            {(user.status === 'unready') ? ('unready') : (null)}
            {(user.status === 'inline') ? ('in line') : (null)}
            {(user.status === 'processing') ? ('in processing') : (null)}
            {(user.status === 'done') ? ('done') : (null)}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                joinLine(session._id);
              }}
            >
              Get In Line
              </Button>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <Loader type="None" color="#somecolor" height={80} width={80} />
    )
  }
}
