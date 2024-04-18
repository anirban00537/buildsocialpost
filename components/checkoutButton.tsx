import React from "react";
import usePaddle from "../hooks/paddle";

const CheckoutButton=() =>{
  const paddle = usePaddle();

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: "pri_1234567890", // you can find it in the product catalog
          quantity: 1,
        },
      ],
      customer: {
        email: "customer@email.com", // email of your current logged in user
      },
      customData: {
        // other custom metadata you want to pass
      },
      settings: {
        // settings like successUrl and theme
      },
    });
  };

  return <button onClick={openCheckout}>Checkout</button>;
}
export default CheckoutButton