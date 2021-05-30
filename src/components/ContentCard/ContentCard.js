import React from "react";
import { Box } from "@material-ui/core";
import useStyles from "./ContentCard.Styles";

// To be used only within a MUI Grid item
function ContentCard({ children, overriddenCardClassName }) {
  const classes = useStyles();

  return (
    <Box
      className={`${classes.root} ${
        overriddenCardClassName || classes.cardDefaultStyle
      }`}
    >
      {children}
    </Box>
  );
}

export default ContentCard;
