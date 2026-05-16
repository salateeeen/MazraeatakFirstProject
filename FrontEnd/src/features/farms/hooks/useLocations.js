import { useQuery } from "@tanstack/react-query";
import { fetchFarmsLocations } from "../services/farmsApi";

export function useLocations(filters = "") {
  return useQuery({
    queryKey: ["locations", filters],
    queryFn: () => fetchFarmsLocations(filters),
  });
}