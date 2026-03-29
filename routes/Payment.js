const express = require("express");
const paymentRouter = express.Router();

const { createOrder } = require("../Controller/PaymentController");

paymentRouter.post("/createOrder", createOrder);

module.exports = paymentRouter;