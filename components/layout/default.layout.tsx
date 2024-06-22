"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </Provider>
  );
};

export default DefaultLayout;
