import { fetchFavoritesFarms } from "@/features/user/services/userApi";
import { useQuery } from "@tanstack/react-query";

export const useFavoritesFarms = (filter) => {
  return useQuery({
    queryKey: ["favoriteFarms", filter],
    queryFn: () => fetchFavoritesFarms(filter),
  });
};


