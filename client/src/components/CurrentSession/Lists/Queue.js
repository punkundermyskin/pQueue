import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { QueueContext } from '../../../context/Queue/QueueState'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// import { QueueContext } from './../../../context/Queue/QueueState';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        // maxWidth: 150,
        backgroundColor: theme.palette.background.paper,
    },
}));


export function Queue({ queue }) {
    const classes = useStyles();

    const { requestStudentForProcessByID } = useContext(QueueContext);

    function renderRow({ data, index, style }) {

        const member = data[index]

        const name = member.firstName + ' ' + member.lastName

        const time = new Date(member.timeJoinQueue)
        const timeJoinQueue = moment(time)

        const hostName = (member.hostName) ? (' (host: ' + member.hostName + ')') : ('')

        const progress = (member.progress) ? (member.progress) : (5)

        return (
            <ListItem button key={member._id} onClick={() => { requestStudentForProcessByID(member._id) }}>
                {/* <ListItemAvatar> */}
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: 'white' }}>
                        <EmojiPeopleIcon htmlColor={'#00c853'} />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText primary={name + hostName} secondary={timeJoinQueue.format('HH:mm:ss')} />
                {/* <ListItemSecondaryAction> */}
                {/* <IconButton > */}

                <ListItemIcon>
                    <CircularProgress variant="static" value={progress} />
                </ListItemIcon>
                {/* </IconButton> */}
                {/* </ListItemSecondaryAction> */}
            </ListItem>
        );
    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    return (
        <div className={classes.root}>
            <FixedSizeList height={300} width={'100%'} itemSize={46} itemCount={queue.length} itemData={queue} >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}