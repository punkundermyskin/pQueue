import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function RequestTitle(props) {
    return (
        <Typography component="h2" variant="h6" color="white" gutterBottom>
            {props.children}
        </Typography>
    );
}

RequestTitle.propTypes = {
    children: PropTypes.node
};
