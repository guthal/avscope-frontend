import React from "react";
import Countdown from "react-countdown";

function CountdownTimer({ onComplete, purchaseDate }) {
    const tempDate = new Date(purchaseDate);
    console.log("BEFORE: ", tempDate);
    tempDate.setHours(tempDate.getHours() + 7);
    console.log("AFTER: ", tempDate);

    return <Countdown date={tempDate} onComplete={onComplete} />;
}

export default CountdownTimer;
