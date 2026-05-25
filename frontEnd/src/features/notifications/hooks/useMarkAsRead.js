import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../services/notificationsApi";
import toast from "react-hot-toast";

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) => markNotificationAsRead(notificationId),
    onSuccess: (responseData) => {
      queryClient.setQueryData(["notifications"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((n) =>
            n._id === responseData.data._id ? { ...n, read: true } : n
          ),
        };
      });
      toast.success("Marked as read!");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to mark notification as read.");
    },
  });
}