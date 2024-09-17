import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Pricing from "./pricing";

export default function PricingModal({
  buttonElement,
}: {
  buttonElement: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonElement}</DialogTrigger>
      <DialogContent className="border border-borderColor text-textColor p-0 overflow-hidden">
        <Pricing />
      </DialogContent>
    </Dialog>
  );
}
