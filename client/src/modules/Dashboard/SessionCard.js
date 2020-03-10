import React from "react";
import Title from "./Title";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'

export const SessionCard = ({ session }) => {

  return (
    <React.Fragment>
      <Title>{session.subject}</Title>
      <Grid container direction="column" justify="center" alignItems="left">
        <Grid>status: {session.status}</Grid>
        <Grid>office: {session.office}</Grid>
        Groups:
        {session.groups.map(group => (
          <li>
            {group} <button onClick={() => console.log(session._id)}>x</button>
          </li>
        ))}

        <Grid>Begin: {moment(session.start).startOf('minut').fromNow()}</Grid>
        <Grid>End: {moment(session.end).format('LT')}</Grid>
      </Grid>
    </React.Fragment>
  )
}