const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { priceId, quantity = 1 } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity }],
    success_url: "https://art-consultations.netlify.app/success.html",
    cancel_url: "https://art-consultations.netlify.app/",
  });
  return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
};   
