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
        <DialogContent className="bg-white rounded-2xl text-textColor sm:max-w-[650px] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Manage Workspaces
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              Select a workspace to manage your content and settings
            </p>
          </DialogHeader>
          
          <div className="flex flex-col min-h-[400px]">
            {isEditing ? (
              <div className="flex-grow">
                <WorkspaceForm
                  onClose={handleWorkspaceFormClose}
                  workspace={editingWorkspace || undefined}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="self-end bg-blue-50/50 hover:bg-blue-100/50 
                           text-blue-600 font-medium
                           transition-all duration-200 rounded-full h-9 px-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Workspace
                </Button>

                <div className="space-y-2">
                  {workspaces.map((workspace: Workspace) => (
                    <div
                      key={workspace.id}
                      className={`group p-4 rounded-2xl transition-all duration-200
                                hover:bg-gray-50/50
                                ${
                                  currentWorkspace?.id === workspace.id
                                    ? "bg-blue-50/30 ring-1 ring-blue-500"
                                    : "bg-gray-50/30 hover:ring-1 hover:ring-gray-200"
                                }`}
                    >
                      <div className="flex items-start justify-between">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => handleSelectWorkspace(workspace)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-gray-900">
                              {workspace.name}
                            </span>
                            {currentWorkspace?.id === workspace.id && (
                              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {moment(workspace.createdAt).format("MMM D, YYYY")}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Layout className="w-4 h-4 text-gray-400" />
                              {workspace.description || "No description"}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-gray-500 hover:text-blue-600 
                                     hover:bg-blue-50 rounded-lg"
                            onClick={() => handleEditWorkspace(workspace)}
                          >
                            <Pencil className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                          </Button>
                          {workspace.id !== currentWorkspace?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-gray-500 hover:text-red-600 
                                       hover:bg-red-50 rounded-lg"
                              onClick={() => handleDeleteWorkspace(workspace)}
                            >
                              <Trash className="w-3.5 h-3.5 mr-1.5" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingWorkspace}
        onOpenChange={() => setDeletingWorkspace(null)}
      >
        <AlertDialogContent className="sm:max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-gray-900">
              Delete Workspace?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              This will permanently delete "<span className="text-gray-900 font-medium">{deletingWorkspace?.name}</span>" 
              and remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel
              className="mt-0 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              onClick={confirmDeleteWorkspace}
            >
              Delete Workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageWorkspacesModal;
