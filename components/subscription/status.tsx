import React from "react";
import PricingModal from "./pricingModal.subscription";
import { Button } from "../ui/button";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DiamondSVG } from "../shared-components/svg-icons";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const SubscriptionInfo = () => {
  const { subscribed, endDate } = useSelector((state: RootState) => state.user);

  if (!subscribed || !endDate) {
    return (
      <PricingModal
        buttonElement={
          <Button
            variant="outline"
            size="xs"
            className="ml-auto flex items-center gap-2 px-4 py-4 text-sm font-medium text-white bg-gradient-to-r from-primary via-primary/90 to-blue-600 hover:from-blue-600 hover:to-blue-400 transition-all duration-300 border-none rounded-xl ease-in-out transform hover:scale-105  hover:shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Upgrade to Pro</span>
            <span className="sm:hidden">Upgrade</span>
          </Button>
        }
      />
    );
  }

  const endDateString = new Date(endDate).toLocaleDateString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="ml-auto flex items-center justify-center w-8 h-8 text-sm bg-gradient-to-r from-blue-500 to-blue-300 rounded-full text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          >
            <DiamondSVG />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm font-medium">Pro • Expires {endDateString}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
