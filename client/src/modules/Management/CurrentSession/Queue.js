import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

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

export function Queue({ members }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={570} width={150} itemSize={46} itemCount={members.length} itemData={members}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}