import { useQuery } from "@tanstack/react-query";
import { fetchMyOwnerRequest } from "../services/ownersApi";

export const useMyOwnerRequest = () => {
  return useQuery({
    queryKey: ["myOwnerRequest"],
    queryFn: fetchMyOwnerRequest,
    retry: false,
  });
};
