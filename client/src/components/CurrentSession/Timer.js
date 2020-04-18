import React, { useContext, useEffect, useState } from 'react'
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';
import Countdown from "react-countdown";
import moment from "moment";

import { QueueContext } from "../../context/Queue/QueueState";

const theme = createMuiTheme({
    palette: {
        secondary: blue,
    },
});

export const Timer = ({ start }) => {
    const { session } = useContext(
        QueueContext
    );
    const begin = new Date(start)
    const date = begin.getTime() + session.minutesForRequest * 1000 * 60

    const [dt, setDt] = useState(new Date());

    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date())
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);
    const currentDate = moment();
    // const endTime = moment.unix(date);
    const endTime = moment(begin).add(session.minutesForRequest, 'minutes');

    const timeLeft = moment(currentDate.diff(endTime)).utc().format('HH:mm:ss') // format("HH:mm:ss");

    const Completionist = () => <span style={{ color: 'red' }}>{timeLeft} extra time!</span>;

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" align={'center'} color="secondary">
                    <Countdown date={date} daysInHours={true}>
                        <Completionist />
                    </Countdown>
                </Typography>
            </ThemeProvider>
        </div>
    )
}
