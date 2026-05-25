import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../services/bookingsApi";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });
};
