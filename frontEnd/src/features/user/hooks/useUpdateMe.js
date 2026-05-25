import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../services/userApi";
import toast from "react-hot-toast";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
  
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};