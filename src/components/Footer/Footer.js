import React, { useContext } from "react";
import { Container, Box, Typography, Grid, Link } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useHistory } from "react-router";
import useStyles from "./Footer.Styles";
import AppStateContext from "../../contexts/AppStateContext";
import { APP_ROUTES } from "../../configs/app";
import Banner from "../../assets/avscopeBanner.png";
import { SOCIAL_MEDIA } from "../../configs/app";

function Footer() {
  const classes = useStyles();
  const history = useHistory();

  const { pageLoading } = useContext(AppStateContext);

  const Copyright = () => {
    return (
      <Box pb={1}>
        <Typography variant="body2" align="left">
          {"Copyright © "}
          AVScope {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    );
  };

  const handleStaticPageClick = type =>
    history.push(`${APP_ROUTES.STATIC_PAGE.path}/${type}`);

  if (pageLoading) {
    return <></>;
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Grid container className={classes.footerContainer}>
                <Grid item md={6} sm={12} xs={12}>
                  <Grid container>
                    <Grid item xs={2}>
                      <img src={Banner} alt="logo" className={classes.title} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="h5" align="left">
                            Address
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="subtitle2" align="left">
                            Opposite Promed Hospital, Under Lakshmi Sagar Hotel,
                            BSK 2nd Stage, Bengaluru - 560028.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <Box my={2}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="h5" align="left">
                              Quick Links
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.footerLinks}
                              onClick={() => handleStaticPageClick("tos")}
                              align="left"
                            >
                              Terms of Service
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.footerLinks}
                              onClick={() =>
                                handleStaticPageClick("privacy-policy")
                              }
                              align="left"
                            >
                              Privacy Policy
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.footerLinks}
                              onClick={() => handleStaticPageClick("help")}
                              align="left"
                            >
                              Need Help?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.footerLinks}
                              onClick={() => handleStaticPageClick("about-us")}
                              align="left"
                            >
                              About Us
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h5" align="left">
                              Follow Us On
                            </Typography>
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <Link
                              href={SOCIAL_MEDIA.FACEBOOK}
                              color="textPrimary"
                            >
                              <FacebookIcon
                                className={`${classes.footerIcons} ${classes.facebook}`}
                              />
                            </Link>
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <Link
                              href={SOCIAL_MEDIA.LINKEDIN}
                              color="textPrimary"
                            >
                              <LinkedInIcon
                                className={`${classes.footerIcons} ${classes.linkedin}`}
                              />
                            </Link>
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <Link
                              href={SOCIAL_MEDIA.INSTAGRAM}
                              color="textPrimary"
                            >
                              <InstagramIcon
                                className={`${classes.footerIcons} ${classes.instagram}`}
                              />
                            </Link>
                          </Grid>
                          {/* <Grid item md={2} xs={3}>
                            <WhatsAppIcon
                              className={`${classes.footerIcons} ${classes.whatsapp}`}
                            />
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Copyright />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
