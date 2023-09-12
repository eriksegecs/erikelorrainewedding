
const Stripe = require('stripe');

export const stripe = new Stripe('API_KEY_STRIPE', {
  apiVersion: "2023-08-16",
  appInfo: {
    name: 'Ignite Shop',
  }
})