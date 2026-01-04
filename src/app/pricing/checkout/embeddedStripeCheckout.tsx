"use client";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useCallback } from 'react';
import { Subscription } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Slgf1BBn3VEv4UWzSkH5UzWWo1606ldFMoJZ4SA4ffyeESb97tC68l7aisJdni74hKuQEZNDr56iKAuWMonCieQ00tSIfFFE1');

const EmbeddedStripeCheckout = (props: { subscription: Subscription }) => {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return fetch(`${API_BASE_URL}/create-checkout-session`, {
      method: "POST",
      body: JSON.stringify(props.subscription)
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default EmbeddedStripeCheckout;
