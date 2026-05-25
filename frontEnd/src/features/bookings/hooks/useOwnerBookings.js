import { useQuery } from "@tanstack/react-query";
import { fetchOwnerBookings } from "../services/bookingsApi";

export const useOwnerBookings = () => {
  return useQuery({
    queryKey: ["ownerBookings"],
    queryFn: fetchOwnerBookings,
  });
};
