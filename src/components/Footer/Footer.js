import React from "react";
import { Box, Typography } from "@material-ui/core";
import useStyles from "./Footer.Styles";

function Footer() {
  const classes = useStyles();

  return (
    <Box p={3} className={classes.root}>
      <Box p={2} className={classes.footerContainer}>
        <Typography>Here is the Footer</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
