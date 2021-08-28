import React, { useState } from "react";
import {
  Box,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  withStyles,
  Tooltip,
  TextField,
} from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import InfoIcon from "@material-ui/icons/Info";
import useStyles from "./DonationCard.Styles";
import Banner from "../../assets/avscopeBanner.png";
import { loadDonationRazorPay } from "../../utils/pay";

const DonationCard = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTextFieldChange = event => {
    setDonationSuccess(false);
    if (event.target.value < 0) {
      setDonationAmount(0);
    } else {
      setDonationAmount(Number(event.target.value));
    }
  };

  const handleAddDonationAmtBtnClick = price => {
    var tempAmnt = 0;
    tempAmnt = donationAmount + price;
    setDonationAmount(tempAmnt);
  };

  const handleDonateBtn = event => {
    loadDonationRazorPay(event, donationAmount, () => {
      setDonationSuccess(true);
      setDonationAmount(0);
    });
  };

  const InfoOnDonation = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.light,
      maxWidth: "250px",
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  return (
    <Box pt={2} className={classes.root}>
      <Button variant="outlined" color="secondary" onClick={handleOpenModal}>
        <Box className={classes.donateBtn}>
          <LocalAtmIcon className={classes.icon} />
          <Box ml={1}>
            <Typography variant="h6">Support AVScope</Typography>
          </Box>
          <Box ml={1}>
            <InfoOnDonation
              placement="top"
              title={
                <Box>
                  <Typography color="inherit" style={{ fontSize: "15px" }}>
                    How does my Donation help?
                  </Typography>
                  <Typography color="textPrimary" style={{ fontSize: "13px" }}>
                    A portion of your Donation will go to the operators of the
                    OTT and the Proceeds would help Support our Creators.
                    <br />{" "}
                    <b>
                      Even a small amount goes a long way into supporting us.
                    </b>
                  </Typography>
                </Box>
              }
            >
              <InfoIcon color="secondary" className={classes.infoIcon} />
            </InfoOnDonation>
          </Box>
        </Box>
      </Button>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className={classes.modalContainer}>
            <Box className={classes.bannerImgContainer}>
              <img src={Banner} alt="logo" className={classes.bannerImg} />
            </Box>
            <Box pt={2}>
              <Typography variant="h5" component="h4">
                Support Us
              </Typography>
            </Box>
            {donationSuccess ? (
              <Box m={1} p={1} borderBottom={2} borderColor="green">
                <Typography variant="h5" style={{ color: "green" }}>
                  Your Donation was Successful! Thank You!
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            <TextField
              variant="outlined"
              color="primary"
              margin="normal"
              label="Enter Donation Amount(in ₹)"
              name="donationAmount"
              type="number"
              value={donationAmount}
              autoComplete="donationAmount"
              className={classes.textField}
              onChange={handleTextFieldChange}
              autoFocus
              fullWidth
              required
            />
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddDonationAmtBtnClick(10)}
              >
                + ₹ 10
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddDonationAmtBtnClick(20)}
              >
                + ₹ 20
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddDonationAmtBtnClick(50)}
              >
                + ₹ 50
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddDonationAmtBtnClick(100)}
              >
                + ₹ 100
              </Button>
            </Box>
            <Box mt={2} className={classes.btn}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleDonateBtn}
              >
                Donate!
              </Button>
            </Box>
            <Box mt={2} className={classes.btn}>
              <Button
                variant="contained"
                className={classes.btn}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default DonationCard;
