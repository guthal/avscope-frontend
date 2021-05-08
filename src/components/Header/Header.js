import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { HEADER_LABELS } from "../../configs/app";
import useStyles from "./Header.Styles";

function Header() {
    const classes = useStyles();

    return (
        <Box mb={2}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        {HEADER_LABELS.LOGO}
                    </Typography>
                    <Button color="secondary" variant="contained">
                        {HEADER_LABELS.LOGIN}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
