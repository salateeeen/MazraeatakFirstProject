import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetMySettings } from "../services/settingsApi";
import toast from "react-hot-toast";

export function useResetSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetMySettings,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
