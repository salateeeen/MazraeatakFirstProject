import { useQuery } from "@tanstack/react-query";
import { fetchFarms } from "../services/farmsApi";

export const useAllFarms = (filters) => {
  return useQuery({
    queryKey: ["allFarms", filters],
    queryFn: () => fetchFarms(filters)
  });
};
