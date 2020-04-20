import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { QueueContext } from "../../../context/Queue/QueueState";

import { useStyles } from "./../Styles/StatusStyles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Countdown from "react-countdown";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export function Unready({ user }) {
  const classes = useStyles({ backgroundColor: 'linear-gradient(45deg, #29a2ab 10%, #4153AF 90%)' });
  const history = useHistory();
  const { session, leaveSession, setFreeOperator, joinLine } = useContext(QueueContext);

  const isStudent = (user.role === 'student')

  const leaveSessionHandler = () => {
    leaveSession(session._id);
    if (isStudent) {
      history.push("/student")
    } else {
      history.push("/operator")
    }

  };

  const title = (isStudent) ? ('Preparation') : ('Pause')

  const end = new Date(session.end)
  const endSessionTime = end.getTime()

  const Completionist = () => <span style={{ color: 'red' }}>Session is about finished</span>;

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
              {title}
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
          {(user.role === 'operator') ? (
            <div>
              <Typography variant="h4" gutterBottom>
                {user.firstName}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {user.lastName}
              </Typography>
            </div>
          ) : (
              <div>
                <Typography variant="h4" gutterBottom>
                  {user.firstName + ' ' + user.lastName}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {session.office + '-' + user.machineID}
                </Typography>
              </div>
            )}
          <Grid item xs="auto" md={6} lg={6}>
            <Countdown date={endSessionTime} daysInHours={true}>
              <Completionist />
            </Countdown>
            {/* ...till the end of the session */}
          </Grid>
          <Grid item xs="auto" md={6} lg={6} className={classes.paper}>
            {(!isStudent) ? (
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setFreeOperator()
                    }}
                  >
                    Start Servering
                  </Button>
                </ThemeProvider>
              </div>
            ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    joinLine(session._id)
                  }}
                >
                  Get In Line
                </Button>
              )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
