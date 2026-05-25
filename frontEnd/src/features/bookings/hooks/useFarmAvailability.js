import { useQuery } from "@tanstack/react-query";
import { fetchFarmAvailability } from "@/features/farms/services/farmsApi";
import { formatToShortDate } from "@/utils/handleDate";

export const useFarmAvailability = (farmId, date) => {
  const dateStr = date instanceof Date ? formatToShortDate(date) : date;

  return useQuery({
    queryKey: ["farmAvailability", farmId, dateStr],
    queryFn: () => fetchFarmAvailability(farmId, dateStr),
    enabled: !!farmId && !!date,
  });
};
