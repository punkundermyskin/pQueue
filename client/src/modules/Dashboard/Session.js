import React from "react";
import Title from "./Title";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'

export const Session = ({ session }) => {
  // const { deleteTransaction } = useContext(GlobalContext);

  // const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <React.Fragment>
      <Title>Session: {session.subject}</Title>
      <Grid container direction="column" justify="center" alignItems="center">
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
// status: {
//   type: String,
//     required: [true, 'Please add a positive or negative number']
// },
// subject: {
//   type: String,
//     required: [true, 'Please add a subject']
// },
// office: {
//   type: String,
//     required: [true, 'Please add a office']
// },
// groups: {
//   type: [Number],
//   // required: [true, 'Please add a groups']
// },
// start: {
//   type: Date,
//   default: Date.now
// },
// end: {
//   type: Date,
// }