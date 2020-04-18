import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Loader from 'react-loader-spinner'
import Paper from "@material-ui/core/Paper";

import { QueueContext } from "../../../../context/Queue/QueueState";
import { useStyles } from "./../../Styles/StatusStyles";

export function Processing({ pair }) {
  const classes = useStyles({ backgroundColor: "linear-gradient(45deg, #FE6B8B 10%, #4153AF 90%)" });
  const history = useHistory();
  const {
    session,
    joinLine,
    leaveSession
  } = useContext(QueueContext);

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
              Processing
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
          {(pair) ? (
            <div>
              <Typography variant="h4" gutterBottom>
                {pair['student'].username}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {pair['operator'].username}
              </Typography>
            </div>
          ) : (null)}
          <Grid item xs="auto" md={6} lg={6}>
            Main Service
        </Grid>
          <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
            Good Luck Mate
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
