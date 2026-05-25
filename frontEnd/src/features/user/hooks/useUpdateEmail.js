import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateEmail } from "../services/userApi";

export function useUpdateEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmail,

    onSuccess: () => {
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
