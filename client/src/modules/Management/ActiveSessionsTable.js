import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import Button from "@material-ui/core/Button";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";

import { SessionsContext } from "../../context/Sessions/SessionsState";
import { useAlert } from "react-alert";
import { QueueContext } from "../../context/Queue/QueueState";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});


const theme = createMuiTheme({
    palette: {
        secondary: green,
    },
});

export default function ActiveSessionsTable() {
    const classes = useStyles();

    const { joinSession, sessionsSuccess, sessions } = useContext(SessionsContext);
    const { session, joinSocketSession, getQueueInfo, leaveSession } = useContext(QueueContext);
    const alert = useAlert();
    const history = useHistory();

    const handleJoinButton = (id) => {
        joinSession(id).then(() => {

            if (sessionsSuccess) {
                alert.show("You have successfully joined the session.");
                joinSocketSession(id)
                // getQueueInfo(id)
                getQueueInfo(id).then(() => {
                    console.log(session)
                    history.push("/management/current-session");
                })

            } else {
                alert.show("Something went wrong!");
            }
        });
    };
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Subject</TableCell>
                        <TableCell align="right">Office</TableCell>
                        <TableCell align="right">Groups</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map(session => (
                        <TableRow key={session._id}>
                            <TableCell component="th" scope="row">
                                <ThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        // className={classes.button}
                                        onClick={() => handleJoinButton(session._id)}
                                        startIcon={<DirectionsRunIcon />}
                                    >
                                        Join
                            </Button>
                                </ThemeProvider>
                            </TableCell>
                            <TableCell align="right">{session.status}</TableCell>
                            <TableCell align="right">{session.subject}</TableCell>
                            <TableCell align="right">{session.office}</TableCell>
                            <TableCell align="right"> # </TableCell>
                            <TableCell align="right">{moment(session.start).startOf('minut').fromNow()}</TableCell>
                            <TableCell align="right">{moment(session.end).format('LT')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}