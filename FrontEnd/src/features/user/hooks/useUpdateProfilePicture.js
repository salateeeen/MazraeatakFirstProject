import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/userApi";
import toast from "react-hot-toast";

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile picture updated successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};
