import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "../services/categoriesApi";
import { toast } from "react-hot-toast";

export const useCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });
};


export function useAdminCategories() {
    return useQuery({
        queryKey: ["admin", "categories"],
        queryFn: fetchCategories,
    });
}

export function useAddCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            toast.success("Category added");
            queryClient.invalidateQueries(["admin", "categories"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast.success("Category deleted");
            queryClient.invalidateQueries(["admin", "categories"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            toast.success("Category updated");
            queryClient.invalidateQueries(["admin", "categories"]);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
}
