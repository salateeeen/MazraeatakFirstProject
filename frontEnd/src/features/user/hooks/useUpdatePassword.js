import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword } from "../services/userApi";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,

    onSuccess: () => {
      toast.success("Password updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
