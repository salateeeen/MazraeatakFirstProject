import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFarm as createFarmApi } from "../services/farmsApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAddFarm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (farmData) => createFarmApi(farmData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      toast.success("Farm created successfully");
      setTimeout(() => {
        navigate("/owner/my-farms");
      }, 1200);
    },
    onError: (err) => {
      toast.error(err.message);

    },
  });
};
