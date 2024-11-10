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
            className="w-full h-8 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
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
            className="flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer"
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
        <TooltipContent side="top" className="bg-white p-2 border border-gray-100 shadow-md">
          <p className="text-sm">
            {subscription.subscription?.productName} • Expires {endDateString}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
