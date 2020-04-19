import React from 'react'
import Typography from "@material-ui/core/Typography";

export const SessionInfo = ({ session }) => {
    return (
        <div>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                status: {session.status}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                subject: {session.subject}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                office: {session.office}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                groups: {session.groups}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                start: {session.start}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                end: {session.end}
            </Typography>
            <Typography component="h2" variant="h6" color="primary" align={'left'} gutterBottom>
                Minutes for Request: {session.minutesForRequest}
            </Typography>
        </div>
    )
}