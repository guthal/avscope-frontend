import React, { useState, useContext } from "react";
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
import InfoIcon from "@material-ui/icons/Info";
import useStyles from "./SupportUsCard.Styles";
import Banner from "../../assets/avscopeBanner.png";
import AuthContext from "../../contexts/AuthContext";
import { loadDonationRazorPay } from "../../utils/pay";

const SupportUsCard = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(1);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const { isUserLoggedIn, userId } = useContext(AuthContext);

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
    handleCloseModal();
    loadDonationRazorPay(event, userId, donationAmount, () => {
      handleOpenModal();
      setDonationSuccess(true);
      setDonationAmount(0);
      setTimeout(() => {
        setDonationSuccess(false);
      }, 5000);
    });
  };

  const InfoOnDonation = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light,
      maxWidth: "250px",
      border: `1px solid ${theme.palette.secondary.dark}`,
    },
  }))(Tooltip);

  function RenderToolTip({ children }) {
    return (
      <InfoOnDonation
        placement="top"
        title={
          <Box>
            <Typography color="textPrimary" className={classes.toolTipHeading}>
              How does my Donation help?
            </Typography>
            <Typography color="textPrimary" className={classes.toolTipDesc}>
              A portion of your Donation will go to the operators of the OTT and
              the Proceeds would help Support our Creators.
              <br />{" "}
              <b>Even a small amount goes a long way into supporting us.</b>
            </Typography>
          </Box>
        }
      >
        {children}
      </InfoOnDonation>
    );
  }

  if (isUserLoggedIn) {
    return (
      <Box pt={2} className={classes.root}>
        <Box className={classes.donateBtnContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            className={classes.donateBtn}
          >
            <Box pt={1}>
              <RenderToolTip>
                <Typography className={classes.attachMoneyIcon}>₹</Typography>
              </RenderToolTip>
            </Box>
          </Button>
        </Box>
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
              <Box
                pt={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h5" component="h4">
                  Support Us
                </Typography>
                <RenderToolTip>
                  <Box ml={1}>
                    <InfoIcon color="primary" className={classes.infoIcon} />
                  </Box>
                </RenderToolTip>
                <Box ml={1}></Box>
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
                  onClick={() => handleAddDonationAmtBtnClick(1)}
                >
                  + ₹ 1
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddDonationAmtBtnClick(5)}
                >
                  + ₹ 5
                </Button>
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
                  onClick={() => handleAddDonationAmtBtnClick(50)}
                >
                  + ₹ 50
                </Button>
              </Box>
              <Box mt={2} className={classes.btn}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={handleDonateBtn}
                >
                  Support!
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
  } else {
    return <></>;
  }
};

export default SupportUsCard;
