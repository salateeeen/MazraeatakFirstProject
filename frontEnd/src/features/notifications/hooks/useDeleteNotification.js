import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification as deleteNotificationApi } from "../services/notificationsApi";
import toast from "react-hot-toast";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) => deleteNotificationApi(notificationId),
    onSuccess: (_, notificationId) => {
      queryClient.setQueryData(["notifications"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((n) => n._id !== notificationId),
        };
      });
      toast.success("Notification deleted successfully!");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete notification.");
    },
  });
}