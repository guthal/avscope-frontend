import React from "react";
import Countdown from "react-countdown";

function CountdownTimer({ onComplete, purchaseDate }) {
  const tempDate = new Date(purchaseDate);
  tempDate.setHours(tempDate.getHours() + 7);

  return <Countdown date={tempDate} onComplete={onComplete} />;
}

export default CountdownTimer;
