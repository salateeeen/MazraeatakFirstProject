import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../services/adminApi";

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAllUsers,
  });
}
