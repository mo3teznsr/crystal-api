
var express = require('express');
var router = express.Router();
const auth=require('../middleware/auth');
const stripe = require('stripe')('sk_test_51J3aCGAeRi6Ok0F8qvDLKllJssDxdOWxNObm8Rt2JJe0LVpwSefawRsyqtrV7uWqLju3ZIZw7905vmLeLwuRCpzj004CUTi26Y'

);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

router.post('/', async (req, res) => {
    if(!req.body.amount)
    {
        return {}
    }
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'sar',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51J3aCGAeRi6Ok0F8mc5hCCi0cWPWhDoLMI2zdrnz7D1sgcJoU4KkvdK9prmcwnyZIhWi70GasGC0g67SUhFfqoiB00NyR7w4mZ'

  });
});


module.exports = router;