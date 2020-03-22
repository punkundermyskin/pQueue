import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Title from './Title';

import SocketContext from './../../../context/SocketContext/context'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 600,
        maxWidth: 250,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export function Queue() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Title>Queue:</Title>

            <FixedSizeList height={570} width={250} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}