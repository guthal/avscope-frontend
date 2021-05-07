import React from "react";
import { Box } from "@material-ui/core";
import useStyles from "./ContentCard.Styles";

// To be used only within a MUI Grid item
function ContentCard({ children, styles }) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}

export default ContentCard;
