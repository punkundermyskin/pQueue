import React, { useContext, useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loader from 'react-loader-spinner'
import ReturnToQueueButton from './ReturnToQueueButton'
import Countdown from "react-countdown";
import moment from "moment";

import { QueueContext } from "../../../../context/Queue/QueueState";

import { useStyles } from "./../../Styles/StatusStyles";

export function Busy({ pair }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #e0672f 10%, #4153AF 90%)' });
  const history = useHistory();
  const { session, leaveSession, finishServeringStudent, returnStudentToQueue } = useContext(QueueContext);

  // const startProcessingTime = (pair['student']) ? (pair['student'].startProcessingTime) : (null)
  // const begin = (startProcessingTime) ? (new Date(startProcessingTime)) : (new Date())
  // const date = begin.getTime() + session.minutesForRequest * 1000 * 60

  const [dt, setDt] = useState(new Date());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);
  // const currentDate = moment();
  // // const endTime = moment.unix(date);
  // const endTime = moment(begin).add(session.minutesForRequest, 'minutes');

  // const timeLeft = moment(currentDate.diff(endTime)).utc().format('HH:mm:ss') // format("HH:mm:ss");

  const leaveSessionHandler = () => {
    leaveSession(session._id);
    history.push("/operator");
  };

  if (pair) {
    const startProcessingTime = new Date(pair['student'].startProcessingTime)
    const endRequest = startProcessingTime.getTime() + session.minutesForRequest * 1000 * 60

    const currentDate = moment();
    const endTime = moment(startProcessingTime).add(session.minutesForRequest, 'minutes');
    const timeLeft = moment(currentDate.diff(endTime)).utc().format('HH:mm:ss') // format("HH:mm:ss");
    const Completionist = () => <span style={{ color: 'red' }}> {timeLeft} extra time!</span>;

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
            // justify="space-around"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              {(pair) ? (pair['operator'].firstName + ' ' + pair['operator'].lastName) : ('John')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              and
            </Typography>
            <Typography variant="h5" gutterBottom>
              {(pair) ? (pair['student'].firstName + ' ' + pair['student'].lastName + ' (PC #' + pair['student'].machineID + ')') : ('Wick')}
            </Typography>
            <Grid item xs="auto" md={6} lg={6}>
              <Typography variant="h6" align={'center'} style={{ color: '#ef9a9a' }}>
                <Countdown date={endRequest} daysInHours={true}>
                  <Completionist />
                </Countdown>
              </Typography>
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
            </Grid>
            <Grid item xs="auto">
              <ReturnToQueueButton />
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
