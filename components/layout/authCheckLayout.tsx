"use client";
import { useAuthUser } from "@/hooks/useAuth";
import React from "react";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthUser();

  return <div>{children}</div>;
};

export default AuthCheckLayout;
