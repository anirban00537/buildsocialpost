// pages/index.js
"use client";
import { auth } from "@/lib/firebase";
import axios from "axios";
import React from "react";

const Index = () => {
  const buyProduct = async () => {
    
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      const response = await axios.post(
        "/api/purchaseProduct",
        {
          productId: "399160",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response");
      window.open(response.data.checkoutUrl, "_blank");
    } else {
      alert("User not authenticated");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <button onClick={buyProduct}>Buy Product</button>
    </div>
  );
};

export default Index;
