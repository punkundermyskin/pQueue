import React from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Timer } from './Timer'
import { Line } from 'rc-progress';

export const ProcessingRequest = ({ pair }) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                                Operator
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component="h2" variant="h6" color="secondary" align={'center'} gutterBottom>
                                PC #{pair['student'].machineID}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component="h2" variant="h6" color="primary" align={'right'} gutterBottom>
                                Student
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body1" align={'left'} noWrap>
                        {pair['operator'].firstName} {pair['operator'].lastName}
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                    <Line percent={pair['student'].progress} strokeWidth="4" strokeColor="#D3D3D3" />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body1" align={'right'}>
                        {pair['student'].firstName} {pair['student'].lastName}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Timer start={pair['student'].startProcessingTime} />
                </Grid>
            </Grid>
        </div>
    )
}
