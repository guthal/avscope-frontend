import React from "react";
import { Box } from "@material-ui/core";
import useStyles from "./ContentCart.Styles";

function ContentCard({ children }) {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.root}>
      {children}
    </Box>
  );
}

export default ContentCard;
