import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export const Checkout = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h4" align="center">
          Session
        </Typography>

        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Create New Session
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="groups"
                label="Numbers Groups"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="operators" label="Operators" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="timeLimit"
                label="Class duration"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Container>
    </div>
  );
};
