import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker } from '@material-ui/pickers';
import ChipInput from 'material-ui-chip-input'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { SessionsContext } from "../../context/Sessions/SessionsState";
import { UsersContext } from "../../context/Users/UsersState";
import { AuthContext } from "../../context/Auth/AuthState";
import { useAlert } from "react-alert";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fields: {
    marginTop: theme.spacing(2)
  }
}));


export const CreateSession = ({ operators }) => {
  const classes = useStyles();

  const { createSessions, sessionsSuccess, sessionsError } = useContext(SessionsContext)
  // const { getOperators, users } = useContext(UsersContext)
  // const { user } = useContext(AuthContext)

  const [subject, setSubject] = useState("");
  const [office, setOffice] = useState("");
  const [groups, handleGroups] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedBeginDate, handleBeginDateChange] = useState(new Date());
  const [selectedFinishDate, handleFinishDateChange] = useState(new Date());

  const alert = useAlert();

  // useEffect(() => {
  //   getOperators()
  // }, []);

  const onSubmit = e => {
    e.preventDefault();

    const newSession = {
      status: "active",
      subject,
      office,
      groups,
      participants,
      start: selectedBeginDate,
      end: selectedFinishDate
    }

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
                onChange={e => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="office"
                label="Office"
                value={office}
                onChange={e => setOffice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                required
                id="groups"
                label="Groups"
                placeholder="enter group number"
                fullWidth
                // value={groups}
                // onChange={e => setGroups(e.target.value)}
                onChange={(chips) => handleGroups(chips)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={operators}
                // defaultValue={[user]}
                getOptionLabel={option => option.username}
                // onChange={(e,v) => setParticipants(v)}
                onChange={(e, v) => setParticipants(v)}
                // onChange={onTagsChange}
                renderInput={params => (
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
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create
          </Button>
            </Grid>
          </Grid>
        </form>
        {/* </React.Fragment> */}
      </Container>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];