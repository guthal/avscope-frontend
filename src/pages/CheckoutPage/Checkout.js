import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { loadRazorPay } from "../../utils/auth";

function CheckoutPage() {
  return (
    <Box m={10}>
      <Button variant="contained" color="secondary" onClick={loadRazorPay}>
        <Typography>Pay ₹ 500</Typography>
      </Button>
    </Box>
  );
}

export default CheckoutPage;
