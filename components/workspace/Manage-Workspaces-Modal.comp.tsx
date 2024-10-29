import React, { FC, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Calendar, Layout, Plus } from "lucide-react";
import { Workspace } from "@/types";
import moment from "moment";
import { useWorkspaces } from "@/hooks/useWorkspace";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import WorkspaceForm from "./Workspace-Form.comp";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";
import { toast } from "react-hot-toast";

interface ManageWorkspacesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageWorkspacesModal: FC<ManageWorkspacesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const {
    refetchWorkspace,
    workspaces,
    isWorkspaceLoading,
    deleteWorkspaceFunction,
  } = useWorkspaces();
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null
  );
  const [deletingWorkspace, setDeletingWorkspace] = useState<Workspace | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      refetchWorkspace();
    }
  }, [isOpen, refetchWorkspace]);

  useEffect(() => {
    if (!isWorkspaceLoading && workspaces.length > 0 && !currentWorkspace) {
      const defaultWorkspace =
        workspaces.find((w) => w.isDefault) || workspaces[0];
      dispatch(setCurrentWorkspace(defaultWorkspace));
    }
  }, [isWorkspaceLoading, workspaces, currentWorkspace, dispatch]);

  const handleEditWorkspace = useCallback((workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setIsEditing(true);
  }, []);

  const handleDeleteWorkspace = useCallback((workspace: Workspace) => {
    setDeletingWorkspace(workspace);
  }, []);

  const confirmDeleteWorkspace = useCallback(async () => {
    if (deletingWorkspace) {
      try {
        await deleteWorkspaceFunction({ id: deletingWorkspace.id.toString() });
        toast.success("Workspace deleted successfully");
        setDeletingWorkspace(null);
        refetchWorkspace();
      } catch (error) {
        toast.error("Failed to delete workspace");
      }
    }
  }, [deletingWorkspace, deleteWorkspaceFunction, refetchWorkspace]);

  const handleSelectWorkspace = useCallback(
    (workspace: Workspace) => {
      dispatch(setCurrentWorkspace(workspace));
      onClose();
    },
    [dispatch, onClose]
  );

  const handleWorkspaceFormClose = useCallback(() => {
    setIsEditing(false);
    setEditingWorkspace(null);
    refetchWorkspace();
  }, [refetchWorkspace]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-background  backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-textColor sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-textColor">
              {isEditing
                ? editingWorkspace
                  ? "Edit Workspace"
                  : "Create New Workspace"
                : "Manage Workspaces"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[400px] ">
            {isEditing ? (
              <div className="flex-grow overflow-y-auto">
                <WorkspaceForm
                  onClose={handleWorkspaceFormClose}
                  workspace={editingWorkspace || undefined}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3 flex-grow overflow-y-auto">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="self-end mb-2 bg-blue-50 mt-5 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 transition-all duration-200 rounded-lg h-9"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Workspace
                </Button>
                {isWorkspaceLoading ? (
                  <LoadingSection className="h-full" />
                ) : (
                  workspaces.map((workspace: Workspace) => (
                    <div
                      key={workspace.id}
                      className={`flex justify-between mx-3 items-center p-3 bg-white rounded-lg transition-all duration-200 ${
                        currentWorkspace?.id === workspace.id
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : "hover:bg-gray-50 ring-1 ring-gray-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">
                          {workspace.name}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span className="mr-3">
                            {moment(workspace.createdAt).format("MMM D, YYYY")}
                          </span>
                          <Layout className="w-3.5 h-3.5 mr-1" />
                          <span>
                            {workspace.description || "No description"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 transition-all duration-200 ${
                            currentWorkspace?.id === workspace.id
                              ? "bg-blue-100 hover:bg-blue-200 text-blue-700"
                              : "bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200"
                          }`}
                          onClick={() => handleSelectWorkspace(workspace)}
                        >
                          Select
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 transition-all duration-200"
                          onClick={() => handleEditWorkspace(workspace)}
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 transition-all duration-200"
                          onClick={() => handleDeleteWorkspace(workspace)}
                          disabled={workspace.id === currentWorkspace?.id}
                        >
                          <Trash className="w-3.5 h-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingWorkspace}
        onOpenChange={() => setDeletingWorkspace(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              workspace "{deletingWorkspace?.name}" and remove all associated
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingWorkspace(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteWorkspace}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageWorkspacesModal;
