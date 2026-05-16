import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmBooking } from "../services/bookingsApi";
import toast from "react-hot-toast";

export function useConfirmBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => confirmBooking(id),
    onSuccess() {
      toast.success("Booking confirmed successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["ownerBookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "owner"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
