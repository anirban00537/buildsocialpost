import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWorkspace } from "@/state/slice/user.slice";
import { RootState } from "@/state/store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceSelectorProps {
  onCreateWorkspace: () => void;
}

const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  onCreateWorkspace,
}) => {
  const dispatch = useDispatch();
  const { workspaces, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentWorkspace?.id?.toString() || "");
  const [search, setSearch] = useState("");

  const filteredWorkspaces = useMemo(() => {
    if (!search) return workspaces;
    return workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [workspaces, search]);

  const handleWorkspaceSelect = (workspaceId: string) => {
    const selectedWorkspace = workspaces.find(
      (w) => w.id.toString() === workspaceId
    );
    if (selectedWorkspace) {
      dispatch(setCurrentWorkspace(selectedWorkspace));
      setValue(workspaceId);
      setOpen(false);
      setSearch("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 px-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-full transition-colors duration-200"
        >
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium">
            {value
              ? workspaces.find(
                  (workspace) => workspace.id.toString() === value
                )?.name
              : "Select workspace..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput
            placeholder="Search workspace..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup>
              {filteredWorkspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.id.toString()}
                  onSelect={handleWorkspaceSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === workspace.id.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {workspace.name}
                  {workspace.isDefault && (
                    <span className="ml-1 text-xs text-gray-200">
                      (Default)
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandGroup>
            <CommandItem onSelect={onCreateWorkspace}>
              <Plus className="mr-2 h-4 w-4" />
              Create Workspace
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSelector;
