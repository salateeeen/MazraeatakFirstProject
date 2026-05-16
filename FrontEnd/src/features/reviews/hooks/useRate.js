import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createReview as createReviewApi } from "../services/reviewsApi";

export function useRate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ farmId, data }) => {
      return createReviewApi(farmId, data);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.farmId],
      });

      toast.success("Review submitted successfully ⭐");

      setTimeout(() => {
        navigate(`/app/farm/${variables.farmId}`);
      }, 1200);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
}
