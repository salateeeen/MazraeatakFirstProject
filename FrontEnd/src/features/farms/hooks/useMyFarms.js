import { useQuery } from "@tanstack/react-query";
import { fetchMyFarms } from "../services/farmsApi";

export const useMyFarms = () => {
  return useQuery({
    queryKey: ["myFarms"],
    queryFn: fetchMyFarms,
  });
};
