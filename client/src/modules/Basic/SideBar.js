import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Divider from '@material-ui/core/Divider';

import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import { GlobalContext } from '../.././context/GlobalState'

export function MainListItems() {
  const history = useHistory();
  const { logoutUser } = useContext(GlobalContext);

  const logoutHandler = e => {
    e.preventDefault();

    logoutUser().then(() => {
      history.push('/login')
    });
  }

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Sessions" />
      </ListItem>
      <ListItem button >
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={logoutHandler}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
}