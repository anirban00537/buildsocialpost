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
import useLinkedIn from "@/hooks/useLinkedIn";

const ManageAccountsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    profiles,
    isLoadingProfiles,
    isConnecting,
    connectLinkedIn,
    disconnectProfile,
  } = useLinkedIn();

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
          {isLoadingProfiles ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {profiles && profiles.length > 0 ? (
                <div className="space-y-3">
                  {profiles.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 border-gray-100"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Image
                          src={account.avatarUrl || "/default-avatar.png"}
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
                        onClick={() => disconnectProfile(account.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No LinkedIn accounts connected
                </div>
              )}

              <Button
                onClick={connectLinkedIn}
                disabled={isConnecting}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white h-10"
              >
                {isConnecting ? (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Connect LinkedIn Account
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAccountsModal;
