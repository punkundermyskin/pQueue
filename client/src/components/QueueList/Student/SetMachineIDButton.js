import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { AuthContext } from "./../../../context/Auth/AuthState";
import { QueueContext } from "./../../../context/Queue/QueueState";
import { SessionsContext } from "./../../../context/Sessions/SessionsState";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function SetMachineIDButton({ sessionID }) {
  const classes = useStyles();
  const { joinSession, sessionsSuccess } = useContext(SessionsContext);
  const { joinSocketSession, getQueueInfo } = useContext(QueueContext);
  const { updateUserMachineID, user } = useContext(AuthContext);

  const [machineID, setMachineID] = React.useState(user.machineID);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const alert = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    updateUserMachineID(machineID).then(() => {
      joinSession(sessionID).then(() => {
        if (sessionsSuccess) {
          joinSocketSession(sessionID);
          getQueueInfo(sessionID);
          history.push("/student/current-session");
          alert.show("You have successfully joined the session.");
        } else {
          alert.show("Something went wrong!");
        }
      });
    });
  };

  return (
    <div>
      <Button variant="contained" color={"secondary"} onClick={handleClickOpen}>
        Join
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set your machine ID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check your workplace identifier
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                required
                id="machineid"
                label="Select"
                value={machineID}
                onChange={(e) => setMachineID(e.target.value)}
                helperText="Please select your machine ID"
              ></TextField>
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
