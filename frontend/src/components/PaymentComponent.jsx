import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q8SesJqHXF6YfOYlPtPJQFMHKbZxAtD1B9PJJNV2qlOEJ4vy3azv5VpZVkESAKZcuhcKTZUQa6gSqDyvvWpnmyy00ahLHKGTx"
); 

const PaymentComponent = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    const stripe = await stripePromise;


    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      
        }),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-center">Complete your payment</h2>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default PaymentComponent;
