import { useMutation, useQuery } from "@tanstack/react-query";
import { requestOwner } from "../services/ownersApi";
import toast from "react-hot-toast";

export function useRequestOwner() {
  return useMutation({
    mutationFn: requestOwner,
    onSuccess: () => {
      toast.success("Owner request submitted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });
}

