import { useQuery } from "@tanstack/react-query";
import { fetchFarmsName } from "../services/farmsApi";

export const useFarmsName = (farmName) => {
 
  return useQuery({
    queryKey: ["farmsName", farmName],
    queryFn: () => fetchFarmsName(farmName),
  });
};
