import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import { QueueContext } from './../../../../context/Queue/QueueState'


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function ReturnToQueueButton() {

    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);
    const [open, setOpen] = React.useState(false);

    const { returnStudentToQueue } = useContext(QueueContext);

    const handleChange = event => {
        setProgress(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        returnStudentToQueue(progress)
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Return to Queue
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Set student progress</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To track the status of the queue,
                        please enter the approximate percentage of students completing the task.
                    </DialogContentText>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={progress}
                                onChange={handleChange}
                                helperText="Please select student progress"
                            >
                                {currencies.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const currencies = [
    {
        value: '10',
        label: '10%',
    },
    {
        value: '20',
        label: '20%',
    },
    {
        value: '30',
        label: '30%',
    },
    {
        value: '40',
        label: '40%',
    },
    {
        value: '50',
        label: '50%',
    },
    {
        value: '60',
        label: '60%',
    },
    {
        value: '70',
        label: '70%',
    },
    {
        value: '80',
        label: '80%',
    },
    {
        value: '90',
        label: '90%',
    },
];