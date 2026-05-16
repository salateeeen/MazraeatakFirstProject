import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../services/reviewsApi";

export const useReviews = (id) => {
  return useQuery({
      queryKey: ["reviews", id],
      queryFn: () => fetchReviews(id),
  });
};
