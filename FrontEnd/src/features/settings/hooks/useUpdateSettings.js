import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsSection } from "../services/settingsApi";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettingsSection,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
