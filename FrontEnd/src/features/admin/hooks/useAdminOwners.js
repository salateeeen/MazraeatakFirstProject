import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPendingOwners, approveOwner, rejectOwner } from "../services/adminApi";
import { toast } from "react-hot-toast";

export function usePendingOwners() {
  return useQuery({
    queryKey: ["admin", "pendingOwners"],
    queryFn: fetchPendingOwners,
  });
}

export function useApproveOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveOwner,
    onSuccess: () => {
      toast.success("Owner approved successfully");
      queryClient.invalidateQueries(["admin", "pendingOwners"]);
      queryClient.invalidateQueries(["admin", "dashboard"]);
    },
    onError: (err) => toast.error(err.message || "Failed to approve"),
  });
}

export function useRejectOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectOwner,
    onSuccess: () => {
      toast.success("Owner rejected");
      queryClient.invalidateQueries(["admin", "pendingOwners"]);
    },
    onError: (err) => toast.error(err.message || "Failed to reject"),
  });
}
