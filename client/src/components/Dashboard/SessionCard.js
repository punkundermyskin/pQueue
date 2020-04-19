import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Button from "@material-ui/core/Button";

import { QueueContext } from './../../context/Queue/QueueState'

export const SessionCard = ({ session }) => {

  const history = useHistory();
  const { getQueueInfo, joinSocketSession } = useContext(QueueContext);
  const handleJoinButton = (id) => {
    joinSocketSession(id);
    getQueueInfo(id);
    history.push("/watch");

  };

  return (
    <React.Fragment>
      <Title>{session.subject}</Title>
      <Grid container direction="column" justify="center">
        <Grid>status: {session.status}</Grid>
        <Grid>office: {session.office}</Grid>
        Groups:
        {session.groups.map((group) => (
          <li key={group}>
            {group} <button onClick={() => console.log(session._id)}>x</button>
          </li>
        ))}
        <Grid>Begin: {moment(session.start).startOf("minut").fromNow()}</Grid>
        <Grid>End: {moment(session.end).format("LT")}</Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleJoinButton(session._id)
            }}
          >
            Watch
              </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
