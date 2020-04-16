import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { QueueContext } from "../../../context/Queue/QueueState";

import { useStyles } from "./Styles/RequestStyles";

export function Request() {
  const classes = useStyles();
  const history = useHistory();
  const { session, leaveSession } = useContext(QueueContext);

  const finishServeringHandler = () => {
    leaveSession('5e8cc51f26c5978a45692c54');
    history.push("/operator");
  };

  return (
    <div className={classes.root}>
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
          <Typography
            component="h2"
            variant="h6"
            className={classes.title}
            gutterBottom
          >
            {session.end}
          </Typography>
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
          <Button
            variant="contained"
            color="primary"
            onClick={finishServeringHandler}
          >
            Finish Servering
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log(session.start);
            }}
          >
            Return To Queue
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
