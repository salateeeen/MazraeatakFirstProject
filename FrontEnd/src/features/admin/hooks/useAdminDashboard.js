import { useQuery } from "@tanstack/react-query";
import { fetchAdminDashboard } from "../services/adminApi";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchAdminDashboard,
  });
}
