import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        alignItems: "center",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    paperButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        alignItems: "center",
    },
    table: {
        minWidth: 650,
    },
}));