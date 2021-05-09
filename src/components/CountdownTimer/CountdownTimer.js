import React from "react";
import Countdown from "react-countdown";

function CountdownTimer() {
    const uponCompletion = () => {
        return <span>Your ticket expired</span>;
    };
    return <Countdown date={Date.now() + 10000}>{uponCompletion()}</Countdown>;
}

export default CountdownTimer;
