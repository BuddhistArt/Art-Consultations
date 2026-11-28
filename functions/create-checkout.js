import Stripe from "stripe";

const stripe = new Stripe("", {
  httpClient: Stripe.createFetchHttpClient(),
});

export async function onRequest(context) {
  const { priceId, quantity = 1 } = await context.request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity }],
    success_url: `https://${context.request.headers.get("host")}/success.html`,
    cancel_url: `https://${context.request.headers.get("host")}/`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
}   
