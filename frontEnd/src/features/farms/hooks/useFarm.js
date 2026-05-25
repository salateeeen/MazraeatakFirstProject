import { useQuery } from "@tanstack/react-query";
import { fetchFarmById } from "../services/farmsApi";

export const useFarm = (id) => {
  return useQuery({
    queryKey: ["FarmById", id],
    queryFn: () => fetchFarmById(id),
  });
};
