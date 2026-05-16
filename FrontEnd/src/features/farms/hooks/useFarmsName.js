import { useQuery } from "@tanstack/react-query";
import { fetchFarmsName } from "../services/farmsApi";

export const useFarmsName = (filters, options = {}) => {
  return useQuery({
    queryKey: ["farmsName", filters],
    queryFn: () => fetchFarmsName(filters),
    ...options
  });
};
