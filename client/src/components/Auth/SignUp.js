import React, { useState, useContext, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { NavLink, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../../context/Auth/AuthState";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUp() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");
  const [machineID, setMachineID] = useState("");

  const { registerUser, isAuth, loadUser, authError } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  var [isStudent, setStudent] = useState(true);

  useEffect(() => {
    loadUser().then(() => {
      if (isAuth) {
        history.push("/dashboard");
        alert.show("You are successfully registered!");
      } else {
        alert.show(authError);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, authError]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isStudent) {
      const user = {
        username,
        firstName,
        lastName,
        role: "student",
        group,
        machineID,
        password,
      };
      registerUser(user);
    } else {
      const user = {
        username,
        firstName,
        lastName,
        role: "operator",
        password,
      };
      registerUser(user);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                type="lastName"
                id="lastName"
                autoComplete="current-password"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color={isStudent ? "primary" : "default"}
                fullWidth
                onClick={() => setStudent(!isStudent)}
              >
                Student
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color={isStudent ? "default" : "secondary"}
                fullWidth
                onClick={() => setStudent(!isStudent)}
              >
                Operator
              </Button>
            </Grid>
            <Grid item xs={6}>
              {isStudent ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="group"
                  label="Group Number"
                  name="group"
                  autoComplete="group"
                  autoFocus
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                />
              ) : null}
            </Grid>
            <Grid item xs={6}>
              {isStudent ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="machineID"
                  label="Machine ID"
                  type="machineID"
                  id="machineID"
                  autoComplete="current-password"
                  value={machineID}
                  onChange={(e) => setMachineID(e.target.value)}
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink exact to="/login" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);
