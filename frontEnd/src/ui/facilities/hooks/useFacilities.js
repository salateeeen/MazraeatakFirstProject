import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFacilities, addFacility, deleteFacility, updateFacility } from "../services/facilitiesApi";
import { toast } from "react-hot-toast";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
  });
};


export function useAdminFacilities() {
    return useQuery({
        queryKey: ["admin", "facilities"],
        queryFn: fetchFacilities,
    });
}

export function useAddFacility() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addFacility,
        onSuccess: () => {
            toast.success("Facility added");
            queryClient.invalidateQueries(["admin", "facilities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useDeleteFacility() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFacility,
        onSuccess: () => {
            toast.success("Facility deleted");
            queryClient.invalidateQueries(["admin", "facilities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useUpdateFacility() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateFacility,
        onSuccess: () => {
            toast.success("Facility updated");
            queryClient.invalidateQueries(["admin", "facilities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}
