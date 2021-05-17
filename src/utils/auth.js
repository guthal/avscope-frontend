import logo from "../assets/logo.png";
import { postCreateOrder, postOrderSuccess } from "../utils/api";
import { COLORS } from "../configs/theme";

export const loadRazorPay = async (
  event,
  userId,
  contentAmount,
  contentId,
  contentType
) => {
  const loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const result = await postCreateOrder({
    amount: contentAmount * 100, // parses as paise, cent
    currency: "INR",
    receipt: "receipt_order_74394",
  });

  if (!result) {
    alert("Server error. Are you online?");
    return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result;

  const orderAmount = amount; // Pass your Payment in Paisa/ Cents/ etc.

  const options = {
    key: "rzp_test_P4Kxye5deZxmHx", // Enter the Key ID generated from the Dashboard
    amount: orderAmount.toString(),
    currency: currency,
    name: "AVScope Inc.",
    description: "Test Transaction",
    image: { logo },
    order_id: order_id,
    handler: async function (response) {
      // const data = {
      //   orderCreationId: orderId,
      //   razorpayPaymentId: response.razorpay_payment_id,
      //   razorpayOrderId: response.razorpay_order_id,
      //   razorpaySignature: response.razorpay_signature,
      // };

      await postOrderSuccess({
        userId: userId,
        contentId: contentId,
        amount: amount,
        type: contentType,
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      });
    },
    prefill: {
      name: "Average Joe",
      email: "average.joe@gmail.com",
      contact: "9999999999",
    },
    theme: {
      color: COLORS.SECONDARY_MAIN,
    },
  };

  const razorPayInstance = new window.Razorpay(options);
  event.preventDefault();
  razorPayInstance.open();
};