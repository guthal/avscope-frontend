import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import useStyles from "./Footer.Styles";
import Banner from "../../assets/avscopeBanner.png";

function Footer() {
  const classes = useStyles();

  return (
    <Box p={3} className={classes.root}>
      <Grid container className={classes.footerContainer}>
        <Grid item md={3} sm={6} xs={12} className={classes.image}>
          <Box className={classes.title}>
            <img src={Banner} alt="logo" />
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box py={3}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  style={{ borderBottom: "1px solid white" }}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam mattis cursus ornare. Fusce consequat est id pharetra
                  tempor.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box py={6} px={2} mx={4}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography className={classes.footerLinks}>
                  Terms of Service
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.footerLinks}>
                  Privacy Policy
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.footerLinks}>
                  Need Help?
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.footerLinks}>
                  About Us
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <Box py={3}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  style={{ borderBottom: "1px solid white" }}
                >
                  Follow Us On
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <FacebookIcon className={classes.footerIcons} />
              </Grid>
              <Grid item xs={3}>
                <TwitterIcon className={classes.footerIcons} />
              </Grid>
              <Grid item xs={3}>
                <InstagramIcon className={classes.footerIcons} />
              </Grid>
              <Grid item xs={3}>
                <WhatsAppIcon className={classes.footerIcons} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
