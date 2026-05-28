import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBooking as createBookingApi } from "../services/bookingsApi";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBookingApi,
    onSuccess() {
      toast.success("Booking created successfully");
      setTimeout(() => {
        navigate("/app/bookings");
      }, 1200);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}