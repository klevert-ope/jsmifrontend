import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

// Initialize Stripe
const stripe = new Stripe(env.SECRET_STRIPE_KEY);

// Handle POST /create-payment-intent
export async function POST({ request }) {
	try {
		const { amount } = await request.json();

		if (typeof amount !== 'number' || amount <= 0) {
			return new Response(
				JSON.stringify({ error: 'Invalid amount provided' }),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100),
			currency: 'usd',
			payment_method_types: ['card', 'apple_pay', 'google_pay']
		});

		return new Response(
			JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
