import logo from "../assets/avscope2.jpeg";

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

  const orderId = "order_test"; // Generate an OrderId and pass to loadRazorPay
  const amount = "50000"; // Pass your Payment in Paisa/ Cents/ etc.

  const options = {
    key: "test_key", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: "INR",
    name: "Soumya Corp.",
    description: "Test Transaction",
    image: { logo },
    order_id: orderId,
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
      console.log("Done");
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
