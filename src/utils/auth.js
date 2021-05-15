import logo from "../assets/avscope2.jpeg";
import { postCreateOrder, postOrderSuccess } from "../utils/api";

export const loadRazorPay = async event => {
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
    amount: "50000",
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

      // const result = await axios.post(
      //   "http://localhost:5000/payment/success",
      //   data
      // );
      await postOrderSuccess({
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
    notes: {
      address: "test_address",
    },
    theme: {
      color: "yellow",
    },
  };

  const razorPayInstance = new window.Razorpay(options);
  event.preventDefault();
  razorPayInstance.open();
};
