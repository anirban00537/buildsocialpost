"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "react-query";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TooltipProvider>
    </Provider>
  );
};

export default DefaultLayout;
