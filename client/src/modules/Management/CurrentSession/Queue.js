import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Title from './Title';

import { QueueContext } from "./../../../context/Queue/QueueState";
// import SocketContext from '../../../context/Queue/context'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 600,
        maxWidth: 150,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow({ data, index, style }) {
    // const { index, style } = props;
    const member = data[index]
    return (
        <ListItem button style={style} key={member._id}>
            <ListItemText primary={member.username} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export function Queue() {
    const classes = useStyles();
    const {
        members,
        session,
        getQueueInfo,
        joinSession,
        leaveSession
    } = useContext(QueueContext);

    return (
        <div className={classes.root}>
            <Title>Queue:</Title>

            <FixedSizeList height={570} width={150} itemSize={46} itemCount={members.length} itemData={members}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}