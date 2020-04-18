import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loader from 'react-loader-spinner'
import ReturnToQueueButton from './ReturnToQueueButton'

import { QueueContext } from "../../../../context/Queue/QueueState";

import { useStyles } from "./../../Styles/StatusStyles";

export function Busy({ pair }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #e0672f 10%, #4153AF 90%)' });
  const history = useHistory();
  const { session, leaveSession, finishServeringStudent, returnStudentToQueue } = useContext(QueueContext);

  const leaveSessionHandler = () => {
    leaveSession(session._id);
    history.push("/operator");
  };

  // if (pair) {
  return (
    <div className={classes.root}>
      <Paper className={classes.status}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              component="h2"
              variant="h6"
              className={classes.title}
              gutterBottom
            >
              Current Request
          </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveSessionHandler}
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
            {(pair) ? (pair['student'].username) : ('John')}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {(pair) ? (pair['operator'].username) : ('Wick')}
          </Typography>
          <Grid item xs="auto" md={6} lg={6}>
            Main Service
        </Grid>
          <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                finishServeringStudent()
              }}
            >
              Finish Servering
            </Button>
            <ReturnToQueueButton />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  // } else {
  //   return (
  //     <Loader type="None" color="#somecolor" height={80} width={80} />
  //   )
  // }
}
