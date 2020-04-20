import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        // height: 350,
        // maxWidth: 150,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow({ data, index, style }) {

    const member = data[index]
    const userName = member.firstName + ' ' + member.lastName
    const hostName = (member.hostName) ? (' (host: ' + member.hostName + ')') : ('')
    const machineID = (member.machineID) ? (' PC #' + member.machineID) : ('')
    const primaryField = userName + machineID
    const secondaryField = member.role + hostName
    var progress = 5
    if (member.role === 'student') {
        if (member.progress) {
            progress = member.progress
        }
    }

    var color = 'gray'
    if (member.role === 'operator') {
        switch (member.status) {
            case 'unready':
                color = 'gray'
                break;
            case 'free':
                color = 'green'
                break;
            case 'busy':
                color = 'red'
                break;
            default:
                break;
        }
    }

    return (
        <ListItem button style={style} key={member._id}>
            <ListItemIcon>
                {(member.role === 'student') ? (
                    <CircularProgress variant="static" value={progress} />) : (
                        <PersonRoundedIcon style={{ color: color }} />
                    )}
            </ListItemIcon>
            <ListItemText primary={primaryField} secondary={secondaryField} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export function Members({ members }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={300} width={'100%'} itemSize={46} itemCount={members.length} itemData={members}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}