import React from "react";
import Script from "next/script";

export const PaddleScript = () => (
  <Script
    src="https://cdn.paddle.com/paddle/paddle.js"
    onLoad={() => {
      if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true") {
        //@ts-ignore
        Paddle.Environment.set("sandbox");
      }
      //@ts-ignore
      Paddle.Setup({
        vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
      });
    }}
  />
);
