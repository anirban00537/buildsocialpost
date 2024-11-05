import React from "react";
import PricingModal from "./Pricing-Modal.comp";
import { Button } from "../ui/button";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DiamondSVG } from "../editor/shared-components/Svg-Icons.comp";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const SubscriptionInfo = () => {
  const { subscription } = useSelector((state: RootState) => state.user);
  const isActive = subscription.isSubscribed && 
    subscription.subscription?.status === 'active';

  if (!isActive) {
    return (
      <PricingModal
        buttonElement={
          <Button
            variant="ghost"
            size="sm"
            className="h-9 flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 rounded-lg transition-all duration-200"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">
              Upgrade to Pro
            </span>
            <span className="sm:hidden text-sm font-medium">Upgrade</span>
          </Button>
        }
      />
    );
  }

  const endDateString = subscription.expiresAt 
    ? new Date(subscription.expiresAt).toLocaleDateString() 
    : 'N/A';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center justify-center w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 rounded-lg transition-all duration-200"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 3, -3, 0],
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
        <TooltipContent className="bg-white text-gray-700 ring-1 ring-gray-200 rounded-lg">
          <p className="text-sm font-medium">
            {subscription.subscription?.productName} • Expires {endDateString}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
