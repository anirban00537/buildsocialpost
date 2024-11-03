import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { 
  getLinkedInAuthUrl, 
  handleLinkedInCallback, 
  getLinkedInProfiles,
  disconnectLinkedInProfile 
} from "@/services/linkedin.service";
import { processApiResponse } from "@/lib/functions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLinkedInProfiles, setCurrentLinkedInProfile } from "@/state/slice/user.slice";

interface LinkedInProfile {
  id: number;
  name: string;
  avatarUrl: string;
  type: 'linkedin';
  status: 'connected' | 'disconnected';
}

export const useLinkedInCallback = (
  code: string | null, 
  state: string | null,
  error?: string | null,
  errorDescription?: string | null,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      // Handle LinkedIn error response
      if (error) {
        throw new Error(decodeURIComponent(errorDescription || 'LinkedIn authentication failed'));
      }

      if (!code || !state) {
        throw new Error('Missing required parameters');
      }

      // Verify state
      const storedState = sessionStorage.getItem('linkedin_state');
      if (state !== storedState) {
        throw new Error('Invalid state parameter');
      }

      return await handleLinkedInCallback(code, state);
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          toast.success('LinkedIn account connected successfully!');
          queryClient.invalidateQueries('linkedinProfiles');
        } else {
          toast.error(response.message || 'Failed to connect LinkedIn account');
        }
      },
      onError: (error: Error) => {
        console.error('LinkedIn callback error:', error);
        toast.error(error.message || 'Failed to connect LinkedIn account');
      },
      onSettled: () => {
        sessionStorage.removeItem('linkedin_state');
        router.push('/');
      }
    }
  );
};

const useLinkedIn = () => {
  const dispatch = useDispatch();
  const { loggedin, linkedinProfiles, currentLinkedInProfile } = useSelector((state: RootState) => state.user);
  const [isConnecting, setIsConnecting] = useState(false);

  const { 
    isLoading: isLoadingProfiles,
    refetch: refetchProfiles
  } = useQuery<LinkedInProfile[]>(
    "linkedinProfiles",
    async () => {
      const response = await getLinkedInProfiles();
      dispatch(setLinkedInProfiles(response.data.profiles));
      return response.data.profiles;
    },
    {
      enabled: loggedin,
      onError: (error) => {
        toast.error("Failed to fetch LinkedIn profiles");
        console.error("Error fetching profiles:", error);
      }
    }
  );

  const selectProfile = (profile: LinkedInProfile | null) => {
    dispatch(setCurrentLinkedInProfile(profile));
  };

  const connectLinkedIn = async () => {
    if (!loggedin) {
      toast.error("You must be logged in to connect LinkedIn.");
      return;
    }

    try {
      setIsConnecting(true);
      const response = await getLinkedInAuthUrl();
      
      if (response.success && response.data.url) {
        sessionStorage.setItem('linkedin_state', response.data.state);
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Failed to initiate LinkedIn connection");
      console.error("LinkedIn connection error:", error);
      setIsConnecting(false);
    }
  };

  const { mutate: disconnectProfile } = useMutation(
    async (profileId: number) => {
      const response = await disconnectLinkedInProfile(profileId);
      return response;
    },
    {
      onSuccess: (response) => {
        processApiResponse(response);
        if (response.success) {
          refetchProfiles();
          toast.success("LinkedIn account disconnected successfully!");
        }
      },
      onError: (error) => {
        toast.error("Failed to disconnect LinkedIn account");
        console.error("LinkedIn disconnect error:", error);
      }
    }
  );

  return {
    profiles: linkedinProfiles,
    currentProfile: currentLinkedInProfile,
    isLoadingProfiles,
    isConnecting,
    connectLinkedIn,
    disconnectProfile,
    selectProfile,
    isAuthenticated: loggedin,
  };
};

export default useLinkedIn; 