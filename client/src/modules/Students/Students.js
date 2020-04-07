import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { AuthContext } from "../../context/Auth/AuthState";
import { SessionsContext } from "../../context/Sessions/SessionsState";

import { Navbar } from "../Basic/Navbar";
import { Copyright } from "../Basic/Copyright";
import ActiveSessionsTable from './ActiveSessionsTable'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        alignItems: "center",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    paperButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        alignItems: "center",
    },
    table: {
        minWidth: 650,
    },
}));

export default function Students() {
    const classes = useStyles();
    const history = useHistory();
    const { loadUser, user, isAuth } = useContext(AuthContext);
    const { sessions, getSessions } = useContext(SessionsContext);
    const alert = useAlert();

    useEffect(() => {
        loadUser().then(() => {
            if (!isAuth) {
                history.push("/login");
            } else if (user.role !== "student") {
                alert.show("Not authorized to access this resource!");
                history.push("/dashboard");
            } else {
                getSessions();
            }
        });
    }, [isAuth]);
    return (
        <div className={classes.root}>
            <Navbar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12} md={8} lg={8} className={classes.paper}>
                        {/* <Paper className={classes.paper}> */}
                        <ActiveSessionsTable />
                        {/* </Paper> */}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
