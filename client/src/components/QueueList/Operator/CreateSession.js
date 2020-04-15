import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { TimePicker } from "@material-ui/pickers";
import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { SessionsContext } from "../../../context/Sessions/SessionsState";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fields: {
    marginTop: theme.spacing(2),
  },
}));

export const CreateSession = ({ operators }) => {
  const classes = useStyles();

  const { createSessions, sessionsSuccess } = useContext(SessionsContext);

  const [subject, setSubject] = useState("");
  const [office, setOffice] = useState("");
  const [groups, handleGroups] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedBeginDate, handleBeginDateChange] = useState(new Date());
  const [selectedFinishDate, handleFinishDateChange] = useState(new Date());

  const alert = useAlert();
  const onSubmit = (e) => {
    e.preventDefault();

    const newSession = {
      status: "active",
      subject,
      office,
      groups,
      participants,
      start: selectedBeginDate,
      end: selectedFinishDate,
    };

    createSessions(newSession).then(() => {
      if (sessionsSuccess) {
        alert.show("New session created.");
      } else {
        alert.show("Something went wrong!");
      }
    });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" gutterBottom>
          Create New Session
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                id="subject"
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="office"
                label="Office"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                required
                id="groups"
                label="Groups"
                placeholder="enter group number"
                fullWidth
                onChange={(chips) => handleGroups(chips)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={operators}
                getOptionLabel={(option) => option.username}
                onChange={(e, v) => setParticipants(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Add operators to your session"
                    placeholder="Operators"
                    value={participants}
                    onChange={({ target }) => setParticipants(target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                className={classes.fields}
                value={selectedBeginDate}
                label="Start"
                onChange={handleBeginDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                className={classes.fields}
                value={selectedFinishDate}
                label="End"
                onChange={handleFinishDateChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
