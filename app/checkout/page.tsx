"use client";
import axios from "axios";
import React from "react";

const index = () => {
  const buyProduct = async () => {
    try {
      const response = await axios.post("/api/purchaseProduct", {
        productId: "399038",
      });
      console.log(response, "response");
      window.open(response.data.checkoutUrl, "_blank");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <button onClick={buyProduct}>Buy Product</button>
    </div>
  );
};

export default index;
