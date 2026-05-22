import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword } from "../services/settingsApi";
import toast from "react-hot-toast";

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
