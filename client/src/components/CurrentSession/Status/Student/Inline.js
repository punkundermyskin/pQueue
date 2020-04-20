import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Loader from 'react-loader-spinner'
import Paper from "@material-ui/core/Paper";

import { QueueContext } from "../../../../context/Queue/QueueState";
import { useStyles } from "./../../Styles/StatusStyles";

export function Inline({ user, queuePosition, operatorsCount }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #e0672f 10%, #4153AF 90%)' });
  const history = useHistory();
  const {
    session,
    leaveLine,
    leaveSession
  } = useContext(QueueContext);

  const minutesForRequest = session.minutesForRequest
  const estimatedTimeBeforeCall = (queuePosition) * session.minutesForRequest / operatorsCount

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
                Inline
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
              {user.firstName}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {(estimatedTimeBeforeCall !== 0) ? (<div>{estimatedTimeBeforeCall} minutes</div>) : (<div> You Are Next</div>)}
            </Typography>
            <Grid item xs="auto" md={6} lg={6}>
              <Typography variant="body1" alighn={'justify'} gutterBottom>
                {(estimatedTimeBeforeCall !== 0) ? (<div>estimated waiting time</div>) : (
                  <div>
                    operator will come
                    <br />
                    to you in a minute
                  </div>
                )}
              </Typography>
            </Grid>
            <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  leaveLine();
                }}
              >
                Unready
              </Button>
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
