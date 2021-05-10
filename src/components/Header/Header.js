import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";
import useStyles from "./Header.Styles";
import { useHistory } from "react-router";

function Header() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogoClick = () => {
    history.push(APP_ROUTES.HOME_PAGE.path);
  };

  return (
    <Box mb={2}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="span"
            onClick={handleLogoClick}
            className={classes.logoContainer}
          >
            <Typography variant="h4" className={classes.title}>
              {HEADER_LABELS.LOGO}
            </Typography>
          </Box>
          <Button color="secondary" variant="contained">
            {HEADER_LABELS.LOGIN}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
