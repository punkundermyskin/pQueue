import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Countdown from "react-countdown";

import { QueueContext } from "../../../../context/Queue/QueueState";

import { useStyles } from "./../../Styles/StatusStyles";

export function Free({ user }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #008000 10%, #4153AF 90%)' });
  const history = useHistory();
  const { session, leaveSession, requestStudentForProcess, setUnreadyOperator } = useContext(QueueContext);

  const end = new Date(session.end)
  const endDate = end.getTime()

  const Completionist = () => <span style={{ color: 'red' }}>Session is ended!</span>;

  const leaveSessionHandler = () => {
    leaveSession(session._id);
    history.push("/operator");
  };


  const getStudentForProcess = () => {
    requestStudentForProcess();
  };

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
              Free
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
            {user.firstName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {user.lastName}
          </Typography>
          <Grid item xs="auto" md={6} lg={6}>
            <Countdown date={endDate} daysInHours={true}>
              <Completionist />
            </Countdown>
            {/* ...till the end of the session */}
          </Grid>
          <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
            <Button
              variant="contained"
              color="primary"
              onClick={getStudentForProcess}
            >
              Next Student
          </Button>
          </Grid>

          <Grid item xs="auto">
            <Button
              variant="contained"
              onClick={() => {
                setUnreadyOperator()
              }}
            >
              Pause
          </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
