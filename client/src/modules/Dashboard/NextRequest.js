import React from 'react';
import Title from './Title';
import Grid from '@material-ui/core/Grid';

export default function NextRequest() {
  return (
    <React.Fragment>
      <Title>Next Request</Title>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid>
          done:    3
        </Grid>
        <Grid>
          in line: 5
        </Grid>
        <Grid>
          unready: 8
        </Grid>
        <Grid>
          busy:    2
        </Grid>
        <Grid>
          free:    0
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
