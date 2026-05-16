import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancleBooking as cancleBookingApi } from "../services/bookingsApi";
import toast from "react-hot-toast";

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => cancleBookingApi(id),
    onSuccess() {
      toast.success("Booking cancled successfully");
      queryClient.invalidateQueries({ queryKey: ["dashboard", "owner"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["ownerBookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}