import React from "react";
import Countdown from "react-countdown";

function CountdownTimer({ onComplete, expiryDate }) {
  return <Countdown date={expiryDate} onComplete={onComplete} />;
}

export default CountdownTimer;
