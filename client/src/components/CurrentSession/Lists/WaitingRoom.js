import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

import { QueueContext } from "../../../context/Queue/QueueState";

import NotInterestedIcon from "@material-ui/icons/NotInterested";
import HowToRegIcon from "@material-ui/icons/HowToReg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function WaitingRoom({ members }) {
  const classes = useStyles();
  const { approveMember } = useContext(QueueContext);

  const approve = (member) => () => {
    approveMember(member);
  };

  return (
    <List className={classes.root}>
      {members.map((member) => {
        return (
          <ListItem
            key={member._id}
            role={undefined}
            dense
            button
            onClick={approve(member)}
          >
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText id={member._id} primary={member.firstName + ' ' + member.lastName} secondary={member.role} />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <NotInterestedIcon color={"secondary"} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
