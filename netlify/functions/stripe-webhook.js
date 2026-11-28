const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  let evt;
  try {
    evt = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return { statusCode: 400, body: "Error: " + e.message };
  }
  if (evt.type === "checkout.session.completed") {
    console.log("Paid:", evt.data.object.id);
  }
  return { statusCode: 200, body: "OK" };
};   
