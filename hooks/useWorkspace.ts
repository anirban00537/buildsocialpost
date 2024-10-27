import { useMutation, useQuery } from "react-query";
import { getMyWorkspaces, createWorkspace } from "@/services/workspace";
import { ResponseData } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setCurrentWorkspace, setWorkspaces } from "@/state/slice/user.slice";

export const useWorkspaces = () => {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { refetch: refetchWorkspace } = useQuery<ResponseData, Error>(
    ["workspace"],
    getMyWorkspaces,
    {
      enabled: loggedin,
      onSuccess: (data: ResponseData) => {
        if (data.data.length > 0) {
          const defaultWorkspace = data.data.find(
            (workspace: any) => workspace.isDefault
          );
          dispatch(setCurrentWorkspace(defaultWorkspace));
        }
        dispatch(setWorkspaces(data.data));
      },
    }
  );
  const { mutateAsync: createNewWorkspace } = useMutation<
    ResponseData,
    Error,
    {
      name: string;
      description: string;
    }
  >(createWorkspace, {
    onSuccess: () => {
      refetchWorkspace();
    },
  });
  return { refetchWorkspace, createNewWorkspace };
};
