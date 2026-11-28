import Stripe from "stripe";

export async function onRequest(context) {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sig = context.request.headers.get("stripe-signature");
  const rawBody = await context.request.text();

  let evt;
  try {
    evt = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      context.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (e) {
    return new Response("Error: " + e.message, { status: 400 });
  }

  if (evt.type === "checkout.session.completed") {
    console.log("Paid:", evt.data.object.id);
  }

  return new Response("OK");
}   
