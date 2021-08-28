import React, { useContext } from "react";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useHistory } from "react-router";
import useStyles from "./Footer.Styles";
import AppStateContext from "../../contexts/AppStateContext";
import { APP_ROUTES } from "../../configs/app";
import Banner from "../../assets/avscopeBanner.png";
import DonationCard from "../DonationCard";

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam mattis cursus ornare. Fusce consequat
                            est id pharetra tempor.
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1" align="left">
                            Call us: 9876543210
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
                            <FacebookIcon
                              className={`${classes.footerIcons} ${classes.facebook}`}
                            />
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <TwitterIcon
                              className={`${classes.footerIcons} ${classes.twitter}`}
                            />
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <InstagramIcon
                              className={`${classes.footerIcons} ${classes.instagram}`}
                            />
                          </Grid>
                          <Grid item md={2} xs={3}>
                            <WhatsAppIcon
                              className={`${classes.footerIcons} ${classes.whatsapp}`}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <DonationCard />
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
