import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Divider from "@material-ui/core/Divider";
import { useAlert } from "react-alert";

import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../.././context/GlobalState";

export function SideBar() {
  const history = useHistory();
  const { logoutUser, isAuth, loadUser, user } = useContext(GlobalContext);
  const alert = useAlert();

  const logoutHandler = e => {
    e.preventDefault();
    if (isAuth) {
      logoutUser().then(() => {
        history.push("/dashboard");
        alert.show("You have successfully logged out.");
      });
    } else {
      history.push("/login");
    }
  };

  const sessionHandler = e => {
    history.push("/session")
    // loadUser().then(() => {
    //   if (!isAuth) {
    //     history.push("/login");
    //   } else if (user.role !== "operator") {
    //     alert.show("Not authorized to access this resource!");
    //     history.push("/dashboard");
    //   } else {
    //     history.push("/session");
    //   }
    // });
  };

  const dashboardHandler = e => {
    history.push("/dashboard");
  };

  const exitItemTitle = isAuth ? "Logout" : "Login";

  return (
    <div>
      <ListItem button onClick={dashboardHandler}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
      <ListItem button onClick={sessionHandler}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Management" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <Divider />
      <ListItem button onClick={logoutHandler}>
        <ListItemIcon>
          {isAuth ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          {/* <ExitToAppIcon /> */}
        </ListItemIcon>
        <ListItemText primary={exitItemTitle} />
      </ListItem>
    </div>
  );
}
