import { useQuery } from "@tanstack/react-query";
import { fetchOwnerDashboard } from "../services/ownersApi";

export function useOwnerDashboard() {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["dashboard", "owner"],
    queryFn: fetchOwnerDashboard,
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 1000,
  });
}
