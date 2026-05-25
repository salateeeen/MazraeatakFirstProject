import { fetchFavorites } from "@/features/user/services/userApi";
import { useQuery } from "@tanstack/react-query";

export const useFavoritesIds = () => {
    return useQuery({
        queryKey: ["favoritesIds"],
        queryFn: fetchFavorites,
    });

};
