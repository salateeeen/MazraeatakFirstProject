import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCities, addCity, deleteCity, updateCity } from "../services/citiesApi";
import { toast } from "react-hot-toast";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });
};


export function useAdminCities() {
    return useQuery({
        queryKey: ["admin", "cities"],
        queryFn: fetchCities,
    });
}

export function useAddCity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCity,
        onSuccess: () => {
            toast.success("City added");
            queryClient.invalidateQueries(["admin", "cities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useDeleteCity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCity,
        onSuccess: () => {
            toast.success("City deleted");
            queryClient.invalidateQueries(["admin", "cities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useUpdateCity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCity,
        onSuccess: () => {
            toast.success("City updated");
            queryClient.invalidateQueries(["admin", "cities"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}
