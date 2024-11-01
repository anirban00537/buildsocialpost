import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Linkedin, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface Account {
  id: number;
  name: string;
  profileImage: string;
  type: 'linkedin';
  status: 'connected' | 'disconnected';
}

interface ManageAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onConnect: () => void;
  onDisconnect: (accountId: number) => void;
}

const ManageAccountsModal = ({
  isOpen,
  onClose,
  accounts,
  onConnect,
  onDisconnect,
}: ManageAccountsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Social Accounts</DialogTitle>
          <DialogDescription>
            Connect and manage your LinkedIn accounts to post content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Connected Accounts List */}
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={account.profileImage}
                    alt={account.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {account.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span className="text-xs text-gray-500">LinkedIn</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDisconnect(account.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Account Button */}
          <Button
            onClick={onConnect}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Connect LinkedIn Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAccountsModal;
