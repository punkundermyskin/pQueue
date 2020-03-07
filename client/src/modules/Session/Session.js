import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { NavBar } from '../Basic/NavBar';
import { Copyright } from './../Basic/Copyright'
import { Checkout } from './Checkout'
import { VirtualizedList } from './VirtualizedList'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    }
}));

export default function Session() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs="auto" md={5} lg={5}>
                            <Paper className={classes.paper}>
                                <Checkout />
                            </Paper>
                        </Grid>
                        <Grid item xs="auto" md={5} lg={5}>
                            <Paper className={classes.paper}>
                                <VirtualizedList />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
