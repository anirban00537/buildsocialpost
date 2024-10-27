import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PricingModal from "./Pricing-Modal.comp";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CreditCard, Diamond } from "lucide-react";
import { DiamondSVG } from "../shared-components/Svg-Icons.comp";

const BillingModal: React.FC = () => {
  const { subscribed, endDate } = useSelector((state: RootState) => state.user);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center border text-textColor border-borderColor">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 text-primary rounded-full w-fit">
            <DiamondSVG />
          </div>
          <DialogTitle className="text-2xl font-bold mt-4 text-textColor">
            Billing Information
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 text-center">
          {subscribed && endDate ? (
            <div className="space-y-4">
              <div className="p-4 border border-borderColor rounded-lg">
                <p className="text-green-700 font-medium">
                  Active Subscription
                </p>
              </div>
              <p className="text-textColor">
                Your subscription is active until:
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatDate(endDate)}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700 font-medium">
                  No Active Subscription
                </p>
              </div>
              <p className="text-gray-600">
                You don't have an active subscription.
              </p>
              <p className="text-sm text-gray-500">
                Subscribe now to access premium features and remove watermarks.
              </p>
              <PricingModal
                buttonElement={
                  <Button className="mt-4 w-full" size="lg">
                    View Pricing Plans
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillingModal;
