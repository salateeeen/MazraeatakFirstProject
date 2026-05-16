import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFarm as deleteFarmApi } from "../services/farmsApi";
import toast from "react-hot-toast";

export function useDeleteFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFarmApi,

    onSuccess: () => {
      toast.success("Farm deleted successfully 🗑️");

      queryClient.invalidateQueries({
        queryKey: ["myFarms"],
      });
    },

    onError: (err) => {
      toast.error(err?.message || "Failed to delete farm");
    },
  });
}
