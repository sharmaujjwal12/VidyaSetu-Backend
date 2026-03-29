const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_SWz0B1XJYNWxyQ",
  key_secret: "nUhaMmWW3fmoBzunHIHozYna"
});

exports.createOrder = async (req, res) => {

  const options = {
    amount: 1 * 100, // 1 rupee
    currency: "INR",
    receipt: "receipt_order"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};