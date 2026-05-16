import { addToFavorites } from "@/features/user/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddToFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToFavorites,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["favoritesIds"] });

      const previous = queryClient.getQueryData(["favoritesIds"]);

      let actionType = "added";

      queryClient.setQueryData(["favoritesIds"], (old) => {
        if (!old) return old;

        const exists = old.data.includes(id);

        actionType = exists ? "removed" : "added";

        return {
          ...old,
          data: exists
            ? old.data.filter((favId) => favId !== id)
            : [...old.data, id],
        };
      });

      return { previous, actionType };
    },

    onSuccess: (data, id, context) => {
      if (context?.actionType === "added") {
        toast.success("Added to favorites ❤️");
      } else {
        toast("Removed from favorites 💔");
      }
    },

    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["favoritesIds"], context.previous);
      }

      toast.error(err?.message || "Failed to update favorites");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteFarms"] });
    },
  });
}
