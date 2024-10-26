import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check } from "lucide-react";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace: (name: string, description: string) => void;
}

interface FormData {
  name: string;
  description: string;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onCreateWorkspace,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const nameMaxLength = 50;
  const descriptionMaxLength = 200;

  const onSubmit = (data: FormData) => {
    onCreateWorkspace(data.name.trim(), data.description.trim());
    reset();
    onClose();
  };

  const nameValue = watch("name");
  const descriptionValue = watch("description");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Workspace</DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter details for your new workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Workspace Name
            </Label>
            <div className="relative">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Workspace name is required",
                  maxLength: {
                    value: nameMaxLength,
                    message: `Workspace name must be ${nameMaxLength} characters or less`,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="name"
                      className={`pr-10 border-2 ${
                        errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="e.g., My Awesome Project"
                      maxLength={nameMaxLength}
                    />
                    {field.value && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {!errors.name ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{nameValue.length}/{nameMaxLength} characters</span>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Workspace Description (Optional)
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: {
                  value: descriptionMaxLength,
                  message: `Description must be ${descriptionMaxLength} characters or less`,
                },
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  className={`border-2 ${
                    errors.description ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Describe the purpose of this workspace..."
                  maxLength={descriptionMaxLength}
                  rows={3}
                />
              )}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{descriptionValue.length}/{descriptionMaxLength} characters</span>
              {errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
