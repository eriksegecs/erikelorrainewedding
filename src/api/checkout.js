
import { stripe } from '../libs/stripe'

export async function handler(req, res) {

    const session = await stripe.checkout.sessions.create({
    success_url: `http://localhost:3000/cart`,
    cancel_url: `http://localhost:3000`,
    mode: 'payment',
    line_items: [
        {
        price: 'price_1NXCaiCo7hdSNhSVnyyTv855',
        quantity: 1
        }
    ]
    })
    return res.status(201).json({
    checkoutUrl: session.url
    })
}