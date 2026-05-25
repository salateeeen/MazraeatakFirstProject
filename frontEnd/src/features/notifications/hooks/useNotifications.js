import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../services/notificationsApi";

export function useNotifications(query) {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(query),
    enabled: !!token
  });
}
