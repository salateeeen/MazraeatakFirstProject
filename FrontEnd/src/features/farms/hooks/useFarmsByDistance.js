import { useQuery } from "@tanstack/react-query";
import { fetchFarmsByDistance } from "../services/farmsApi";

export const useFarmsByDistance = ({distance, lat, lng, unit}) => {
  return useQuery({
    queryKey: ["farms-by-distance", {distance, lat, lng, unit}],
    queryFn: () => fetchFarmsByDistance(distance, lat, lng, unit),
  });
};
