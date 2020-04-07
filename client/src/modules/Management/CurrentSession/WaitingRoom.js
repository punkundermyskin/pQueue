// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';

// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';

// import Grid from "@material-ui/core/Grid";

// import { QueueContext } from "../../../context/Queue/QueueState";
// // import SocketContext from '../../../context/Queue/context'

// import HowToRegIcon from '@material-ui/icons/HowToReg';
// import NotInterestedIcon from '@material-ui/icons/NotInterested';

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//         height: 350,
//         // maxWidth: 150,
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// function renderRow({ data, index, style }) {
//     // const { index, style } = props;
//     const member = data[index]
//     return (
//         // <div>
//         //     <HowToRegIcon color='primary' onClick={() => { console.log('HowToRegIcon') }} />

//         <ListItem button style={style} key={member._id}>
//             <ListItemText primary={member.username} />
//             <ListItemSecondaryAction>
//                 {/* <IconButton edge="end" aria-label="comments"> */}
//                 {/* <CommentIcon /> */}
//                 <NotInterestedIcon color='secondary' onClick={() => { console.log('NotInterestedIcon') }} />
//                 {/* </IconButton> */}
//             </ListItemSecondaryAction>
//         </ListItem>
//         // </div>
//     );
// }

// renderRow.propTypes = {
//     index: PropTypes.number.isRequired,
//     style: PropTypes.object.isRequired,
// };

// export function WaitingRoom({ members }) {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <FixedSizeList height={570} width={300} itemSize={46} itemCount={members.length} itemData={members}>
//                 {renderRow}
//             </FixedSizeList>
//         </div>
//     );
// }

import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import { QueueContext } from "../../../context/Queue/QueueState";

import NotInterestedIcon from '@material-ui/icons/NotInterested';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function WaitingRoom({ members }) {
    const classes = useStyles();
    const { approveMember } = useContext(QueueContext);

    const approve = (member) => () => {
        approveMember(member)
    };

    return (
        <List className={classes.root}>
            {members.map((member) => {
                return (
                    <ListItem key={member._id} role={undefined} dense button onClick={approve(member)}>
                        <ListItemIcon>
                            <HowToRegIcon />
                        </ListItemIcon>
                        <ListItemText id={member._id} primary={member.username} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <NotInterestedIcon color={'secondary'} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}